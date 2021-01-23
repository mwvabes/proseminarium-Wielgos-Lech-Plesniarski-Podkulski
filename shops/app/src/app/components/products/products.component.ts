import { Component, OnInit } from '@angular/core';
import { Filters } from 'src/app/models/filters';
import { Product } from 'src/app/models/product';
import { Sort } from 'src/app/models/sort';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  _products: Product[];
  filter: Filters = {
    nazwa: '',
    cenaNettoFrom: null,
    cenaNettoTo: null,
    cenaBruttoFrom: null,
    cenaBruttoTo: null,
  };
  sort: Sort;

  get products(): Product[] {
    if (!this._products || this._products.length === 0) {
      return [];
    }
    return this._products
      .filter((product) => {
        if (
          this.filter.nazwa &&
          this.filter.nazwa !== '' &&
          !product.nazwa.toLowerCase().includes(this.filter.nazwa.toLowerCase())
        ) {
          return false;
        }
        if (
          this.filter.cenaNettoFrom &&
          !(product.cena_netto >= this.filter.cenaNettoFrom)
        ) {
          return false;
        }
        if (
          this.filter.cenaNettoTo &&
          !(product.cena_netto <= this.filter.cenaNettoTo)
        ) {
          return false;
        }
        if (
          this.filter.cenaBruttoFrom &&
          !(
            product.cena_netto * (1 + product.procentowa_stawka_vat / 100) >=
            this.filter.cenaBruttoFrom
          )
        ) {
          return false;
        }
        if (
          this.filter.cenaBruttoTo &&
          !(
            product.cena_netto * (1 + product.procentowa_stawka_vat / 100) <=
            this.filter.cenaBruttoTo
          )
        ) {
          return false;
        }
        return true;
      })
      .sort((a: Product, b: Product) => {
        if (!this.sort) {
          return 0;
        }
        if (this.sort.sort === 'nazwa' && this.sort.order === 'asc') {
          return a.nazwa.localeCompare(b.nazwa);
        }
        if (this.sort.sort === 'cena_netto' && this.sort.order === 'asc') {
          return a.cena_netto - b.cena_netto;
        }
        if (this.sort.sort === 'cena_netto' && this.sort.order === 'desc') {
          return b.cena_netto - a.cena_netto;
        }
        if (this.sort.sort === 'cena_brutto' && this.sort.order === 'asc') {
          return (
            a.cena_netto * (1 + a.procentowa_stawka_vat / 100) -
            b.cena_netto * (1 + b.procentowa_stawka_vat / 100)
          );
        }
        if (this.sort.sort === 'cena_brutto' && this.sort.order === 'desc') {
          return (
            b.cena_netto * (1 + b.procentowa_stawka_vat / 100) -
            a.cena_netto * (1 + a.procentowa_stawka_vat / 100)
          );
        }
        return 0;
      });
  }

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.produktySubject$.subscribe((val) => {
      this._products = val;
    });
  }

  changeSort(sort: Sort) {
    this.sort = sort;
  }

  changeFilter(filter: Filters) {
    this.filter = filter;
  }
}
