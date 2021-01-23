import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { BasketService } from 'src/app/components/basket/basket.service';
@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.css'],
})
export class ProductsListItemComponent implements OnInit {
  @Input() data: Product;
  count: number = 0;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  addToCart() {
    this.basketService.add({ produktId: this.data.id, ilosc: this.count });
    this.count = 0;
  }
}
