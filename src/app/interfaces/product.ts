import {Sizes} from './sizes';

export interface Product {
  id?: number;
  name: string;
  details: string;
  price: number;
  color: string;
  gender: string;
  type: string;
  size?: Sizes;
  imageId?: number;
}
