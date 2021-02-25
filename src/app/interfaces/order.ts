import {OrderedItem} from './ordered-item';

export interface Order{

  id: number;
  totalPrice: number;
  userID: number;
  purchasedClothesList: OrderedItem[];
  comment: '';
  finish: boolean;
}
