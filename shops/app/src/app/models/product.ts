export interface BasketProduct {
  produktId: number;
  ilosc: number;
}

export interface Product {
  id: number;
  nazwa: string;
  cena_netto: number;
  procentowa_stawka_vat: number;
}

export interface ProductResponse {
  count: number;
  rows: Product[];
}
