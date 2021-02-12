import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Kontrahent, Podmiot } from 'src/app/models/order';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  data: any;
  produkty: any;
  podmioty: Podmiot[];
  kontrahenci: Kontrahent[];
  newPodmiotForm: FormGroup;
  editPodmiotForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private translate: TranslateService
  ) {
    this.basketService.getAll().subscribe((val) => {
      this.produkty = val;
    });
  }

  ngOnInit() {
    this.basketService.totalBruttoSubject$.subscribe((val) => {
      this.data = this.basketService.getData();
    });
  }

  createOrder(): void {
    if (this.data.length > 0) {
      this.basketService
        .createOrder({
          pozycje_zamowienia: this.data,
        })
        .subscribe(
          (val) => {
            this.produkty = null;
            this.basketService.clear();
          },
          (err) => {}
        );
    }
  }
}
