import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order, OrderResponse } from '../../models/order';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/models/pagination';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  getOrders(pagination: Pagination): Observable<OrderResponse> {
    const val = {
      ...pagination,
      page: pagination.page - 1,
    };

    let params = new HttpParams();
    Object.keys(val).forEach((key) => {
      if (!val[key] || val[key] == null) {
        delete val[key];
        return;
      }
      params = params.append(key, val[key].toString());
    });

    return this.httpClient.get<OrderResponse>(
      `${environment.apiUrl}/zamowienie`,
      { params }
    );
  }

  getOrder(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.apiUrl}/zamowienie/${id}`);
  }
}
