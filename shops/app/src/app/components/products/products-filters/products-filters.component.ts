import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Filters } from 'src/app/models/filters';
import { Kontrahent } from 'src/app/models/order';
import { Sort } from 'src/app/models/sort';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.css'],
})
export class ProductsFiltersComponent implements OnInit {
  @Output() sortEvent: EventEmitter<Sort> = new EventEmitter();
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  kontrahenci: Kontrahent[];
  kontrahent: string;

  filterForm: FormGroup = this.formBuilder.group({
    nazwa: [],
    cenaNettoFrom: [],
    cenaNettoTo: [],
    cenaBruttoFrom: [],
    cenaBruttoTo: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.basketService.getKontrahent().subscribe((val) => {
      this.kontrahenci = val;
      if (this.basketService.kontrahent) {
        this.kontrahent = this.basketService.kontrahent.nip;
      }
    });
  }

  changeKontrahent(event: any) {
    let kontrahent = null;
    if (this.kontrahent) {
      kontrahent = this.kontrahenci.find(
        (kontrahent) => kontrahent.nip === event.target.value
      );
    }
    this.basketService.selectKontrahent(kontrahent);
  }

  filterFormSend() {
    this.filterEvent.emit(this.filterForm.value);
  }

  filterFormClear() {
    this.filterForm.reset();
    this.filterFormSend();
  }
}
