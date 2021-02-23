import {OrderedItem} from './ordered-item';

export interface Order{

  id: number;
  totalPrice: number;
  status: boolean;
  userID: number;
  order: OrderedItem[];
}
