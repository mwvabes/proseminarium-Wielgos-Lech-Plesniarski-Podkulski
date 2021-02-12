import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { NewOrderPayload } from 'src/app/models/order';
import {
  BasketProduct,
  Product,
  ProductResponse,
} from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private totalBruttoSubject = new BehaviorSubject<number>(0);
  public totalBruttoSubject$ = this.totalBruttoSubject.asObservable();

  private produktySubject = new BehaviorSubject<Product[]>(null);
  public produktySubject$ = this.produktySubject.asObservable();

  total: number = 0;
  data: BasketProduct[] = [];
  produkty: Product[];

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getAll() {
    return of(this.data);
  }

  createOrder(payload: NewOrderPayload) {
    return this.http.post(`${environment.apiUrl}/zamowienie`, payload);
  }

  getData() {
    return this.data.map((item) => {
      const val = {
        id_produktu: item.produktId,
        ilosc: item.ilosc,
        ...this.produkty.find((produkt) => produkt.id === item.produktId),
      };
      delete val['id'];
      return val;
    });
  }

  add(product: BasketProduct) {
    const existingIndex = this.data.findIndex(
      (item) => item.produktId === product.produktId
    );
    if (existingIndex !== -1) {
      this.data[existingIndex].ilosc += product.ilosc;
    } else {
      this.data.push(product);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    const value = this.getData().reduce((prev, { ilosc, cena }) => {
      return prev + ilosc * cena;
    }, 0);
    this.total = value;
    this.totalBruttoSubject.next(value);
  }

  clear(): void {
    this.data = [];
    this.total = 0;
    this.totalBruttoSubject.next(0);
  }

  getProducts() {
    this.http
      .get<Product[]>(`http://localhost:90/products/api/produkty`)
      .subscribe((res) => {
        this.produkty = res;
        this.produktySubject.next(res);
        this.calculateTotal();
      });
  }
}
