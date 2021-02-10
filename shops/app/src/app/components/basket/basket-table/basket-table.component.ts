import { Component, OnInit } from '@angular/core';
import { BasketProduct } from 'src/app/models/product';
import { BasketService } from 'src/app/components/basket/basket.service';

@Component({
  selector: 'app-basket-table',
  templateUrl: './basket-table.component.html',
  styleUrls: ['./basket-table.component.css'],
})
export class BasketTableComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
