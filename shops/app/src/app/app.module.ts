import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsFiltersComponent } from './components/products/products-filters/products-filters.component';
import { ProductsListItemComponent } from './components/products/products-list/products-list-item/products-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BasketComponent } from './components/basket/basket.component';
import { BasketTableComponent } from './components/basket/basket-table/basket-table.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OrdersDetailsComponent } from './components/orders/orders-details/orders-details.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FooterComponent,
    NavComponent,
    ProductsListComponent,
    ProductsFiltersComponent,
    ProductsListItemComponent,
    BasketComponent,
    BasketTableComponent,
    OrdersComponent,
    OrdersDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
