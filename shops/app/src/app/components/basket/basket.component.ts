import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Kontrahent, Podmiot } from 'src/app/models/order';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidateNip } from 'src/app/shared/validators/nip.validator';
import { BasketProduct } from 'src/app/models/product';

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
  orderForm: FormGroup;
  newPodmiotForm: FormGroup;
  editPodmiotForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.orderForm = this.formBuilder.group({
      kontrahentId: [, [Validators.required]],
      podmiotId: [, [Validators.required]],
      priorytet: [, [Validators.required]],
    });
    this.newPodmiotForm = this.formBuilder.group({
      nazwa: [, [Validators.required]],
      nip: [, [Validators.required, ValidateNip]],
      adres: [, [Validators.required]],
    });
    this.editPodmiotForm = this.formBuilder.group({
      nazwa: [, [Validators.required]],
      nip: [, [Validators.required, ValidateNip]],
      adres: [, [Validators.required]],
    });
    this.basketService.getAll().subscribe((val) => {
      this.produkty = val;
    });
    this.basketService.getPodmiot().subscribe((val) => {
      this.podmioty = val;
    });
    this.basketService.getKontrahent().subscribe((val) => {
      this.kontrahenci = val;
      if (this.basketService.kontrahent) {
        this.orderForm.controls['kontrahentId'].patchValue(
          this.basketService.kontrahent.id
        );
      }
    });
  }

  ngOnInit() {
    this.basketService.totalBruttoSubject$.subscribe((val) => {
      this.data = this.basketService.getData();
    });

    this.orderForm.controls['podmiotId'].valueChanges.subscribe((x) => {
      const podmiot = this.podmioty.find((podmiot) => podmiot.id === +x);
      this.editPodmiotForm.patchValue(podmiot!);
    });
    this.orderForm.controls['kontrahentId'].valueChanges.subscribe((x) => {
      const kontrahent = this.kontrahenci.find(
        (kontrahent) => kontrahent.id === +x
      );
      this.basketService.selectKontrahent(kontrahent);
    });
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      this.basketService
        .createOrder({
          ...this.orderForm.value,
          pozycje_zamowienia: this.data,
        })
        .subscribe(
          (val) => {
            this.produkty = null;
            this.orderForm.reset();
            this.basketService.clear();
          },
          (err) => {}
        );
    }
  }

  openDodaj(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.basketService
            .createPodmiot(this.newPodmiotForm.value)
            .subscribe((val) => {
              this.newPodmiotForm.reset();
              this.basketService.getPodmiot().subscribe((val) => {
                this.podmioty = val;
              });
            });
        },
        (reason) => {}
      );
  }

  openEdytuj(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.basketService
            .editPodmiot(
              this.orderForm.controls['podmiotId'].value,
              this.editPodmiotForm.value
            )
            .subscribe((val) => {
              this.editPodmiotForm.reset();
              this.basketService.getPodmiot().subscribe((val) => {
                this.podmioty = val;
              });
            });
        },
        (reason) => {}
      );
  }
}
