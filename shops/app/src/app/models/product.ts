export interface BasketProduct {
  produktId: number;
  ilosc: number;
}

export interface Product {
  id: number;
  nazwa: string;
  cena: number;
  opis: string;
  wymiary: string;
  ean: string;
  kategoria: string;
}

export interface ProductResponse {
  products: Product[];
}
