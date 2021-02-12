import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css'],
})
export class OrdersDetailsComponent implements OnInit {
  orderId: number;
  data: Order;
  statusForm: FormGroup;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private translate: TranslateService,
    private fromBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });

    this.statusForm = this.fromBuilder.group({
      typ: [],
      opis: [],
    });

    this.getOrder();
  }

  getOrder(): void {
    this.ordersService.getOrder(this.orderId).subscribe((res) => {
      this.data = res;
    });
  }

  getTotalNetto(): number {
    return this.data.pozycje_zamowienia.reduce(
      (prev, { ilosc, cena_netto }) => {
        return prev + ilosc * cena_netto;
      },
      0
    );
  }

  getStatus(): string {
    const statusId = Math.max.apply(
      Math,
      this.data.statusy.map((value) => value.id)
    );
    const status = this.data.statusy.find((status) => status.id === statusId);
    return status ? status.typ : '';
  }
}
