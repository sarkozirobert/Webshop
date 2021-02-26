import {OrderedItem} from './ordered-item';
import {User} from './user';

export interface PurchasePackToSend {
  orderedItems: OrderedItem[];
  id: number;
  totalPrice: number;
  comment: string;
}
