import {Sizes} from './sizes';

export interface Product {
  name: string;
  id: number;
  details: string;
  price: number;
  color: string;
  gender: string;
  type: string;
  size: Sizes;

}
