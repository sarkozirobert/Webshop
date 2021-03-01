import {PurchasedClothesList} from './purchasedClothesList';

export interface OrderItemDisplay extends PurchasedClothesList {
  orderId?: number;
  totalPrice?: number;
  itemCount?: number;
};
