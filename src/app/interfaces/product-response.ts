import {Product} from './product';

export interface ProductResponse {
  success: boolean;
  list: Product[];
}
