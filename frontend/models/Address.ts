export interface Address {
  id: number;
  street: string;
  neighborhood: string;
  number: string;
  cityId: number;
  city: City;
}

export interface City {
  id: number;
  name: string;
}
