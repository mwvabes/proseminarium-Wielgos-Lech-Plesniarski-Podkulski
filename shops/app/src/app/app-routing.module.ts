import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersDetailsComponent } from './components/orders/orders-details/orders-details.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/details/:id', component: OrdersDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
