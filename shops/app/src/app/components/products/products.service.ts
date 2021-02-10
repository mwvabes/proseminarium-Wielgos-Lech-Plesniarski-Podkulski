import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(nip?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (nip) {
      params = params.append('nip', nip);
    }

    return this.httpClient.get<Product[]>(`${environment.apiUrl}/produkt`, {
      params,
    });
  }
}
