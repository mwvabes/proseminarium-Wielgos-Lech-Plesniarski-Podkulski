import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/components/basket/basket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  total: number;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.totalBruttoSubject$.subscribe(
      (value) => (this.total = value)
    );
  }
}
