import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  Kontrahent,
  NewOrderPayload,
  NewPodmiotPayload,
  Podmiot,
} from 'src/app/models/order';
import { BasketProduct, Product } from 'src/app/models/product';
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
  public kontrahent: Kontrahent;
  produkty: Product[];

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getAll() {
    return of(this.data);
  }

  getPodmiot(): Observable<Podmiot[]> {
    return this.http.get<Podmiot[]>(`${environment.apiUrl}/podmiot`);
  }

  createPodmiot(payload: NewPodmiotPayload) {
    return this.http.post(`${environment.apiUrl}/podmiot`, payload);
  }

  editPodmiot(id: number, payload: NewPodmiotPayload) {
    return this.http.put(`${environment.apiUrl}/podmiot/`, { ...payload, id });
  }

  getKontrahent(): Observable<Kontrahent[]> {
    return this.http.get<Kontrahent[]>(`${environment.apiUrl}/kontrahent`);
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

  selectKontrahent(kontrahent?: Kontrahent) {
    this.kontrahent = kontrahent;
    this.getProducts(kontrahent?.nip);
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
    const value = this.getData().reduce(
      (prev, { ilosc, cena_netto, procentowa_stawka_vat }) => {
        return prev + ilosc * (cena_netto * (1 + procentowa_stawka_vat / 100));
      },
      0
    );
    this.total = value;
    this.totalBruttoSubject.next(value);
  }

  clear(): void {
    this.data = [];
    this.total = 0;
    this.totalBruttoSubject.next(0);
  }

  getProducts(nip?: string) {
    let params = new HttpParams();
    if (nip) {
      params = params.append('nip', nip);
    }

    this.http
      .get<Product[]>(`${environment.apiUrl}/produkt`, {
        params,
      })
      .subscribe((res) => {
        this.produkty = res;
        this.produktySubject.next(res);
        this.calculateTotal();
      });
  }
}
