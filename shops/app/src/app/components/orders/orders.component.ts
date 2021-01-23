import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order';
import { Pagination } from 'src/app/models/pagination';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  data: OrderResponse;
  pagination: Pagination = { page: 1, size: 10 };

  constructor(private service: OrdersService) {}

  ngOnInit() {
    this.getOrders();
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.getOrders();
  }

  getOrders(): void {
    this.service.getOrders(this.pagination).subscribe((res) => {
      this.data = res;
    });
  }

  getStatus(index: number): string {
    const statusId = Math.max.apply(
      Math,
      this.data.rows[index].statusy.map((value) => value.id)
    );
    const status = this.data.rows[index].statusy.find(
      (status) => status.id === statusId
    );
    return status ? status.typ : '';
  }

  getTotalNetto(index: number): number {
    return this.data.rows[index].pozycje_zamowienia.reduce(
      (prev, { ilosc, cena_netto }) => {
        return prev + ilosc * cena_netto;
      },
      0
    );
  }
}
