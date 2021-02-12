import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/components/basket/basket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  total: number;

  constructor(private basketService: BasketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.basketService.totalBruttoSubject$.subscribe(
      (value) => (this.total = value)
    );
  }

  login() {
    window.location.href = 'http://localhost:8080/zamowienie/login';
  }

  data() {
    this.http
      .get('http://localhost:8080/zamowienie/userData')
      .subscribe((val) => console.log(val));
  }
}
