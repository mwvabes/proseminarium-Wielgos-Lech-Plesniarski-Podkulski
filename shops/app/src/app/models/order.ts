import { Product } from './product';

export interface Order {
  id: number;
  priorytet: string;
  podmiotId: number;
  kontrahentId: number;
  podmiot: Podmiot;
  kontrahent: Kontrahent;
  statusy: Status[];
  pozycje_zamowienia: PozycjaZamowienia[];
}

export interface OrderResponse {
  count: number;
  rows: Order[];
}

export interface Podmiot {
  id: number;
  nazwa: string;
  nip: string;
  adres: string;
}

export interface Kontrahent {
  id: number;
  nazwa: string;
  nip: string;
  adres: string;
}

export interface Status {
  id: number;
  data_godzina: Date;
  typ: string;
  opis: string;
}

export interface PozycjaZamowienia {
  id: number;
  ilosc: number;
  zamowienieId: number;
  produktId: number;
  nazwa: string;
  cena_netto: number;
  procentowa_stawka_vat: number;
}

export interface NewStatusPayload {
  typ: string;
  opis: string;
  zamowienieId: number;
}

export interface NewOrderPayload {
  kontrahentId: number;
  podmiotId: number;
  priorytet: string;
  pozycje_zamowienia: NewOrderPozycjaZamowienia[];
}

export interface NewOrderPozycjaZamowienia {
  produktId: number;
  ilosc: number;
}

export interface NewPodmiotPayload {
  nazwa: string;
  nip: string;
  adres: string;
}
