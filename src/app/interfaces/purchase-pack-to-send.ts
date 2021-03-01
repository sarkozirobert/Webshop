import {PurchasedClothesList} from './purchasedClothesList';
import {User} from './user';

export interface PurchasePackToSend {
  purchasedClothesList: PurchasedClothesList[];
  id: number;
  userId: number;
  finish: boolean;
  totalPrice: number;
  comment: string;
}
