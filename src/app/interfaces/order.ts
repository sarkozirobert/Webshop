import {PurchasedClothesList} from './purchasedClothesList';

export interface Order{

  id: number;
  totalPrice: number;
  userID: number;
  purchasedClothesList: PurchasedClothesList[];
  comment: '';
  finish: boolean;
}
