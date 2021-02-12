import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  @Input()
  set data(value: Product[]) {
    this._data = value;
    this.page = 1;
  }

  _data: Product[];
  page = 1;
  pageSize = 9;

  constructor() {}

  changePage(page: number) {
    this.page = page;
  }
}
