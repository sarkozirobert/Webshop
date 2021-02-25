import {Order} from './order';

export interface OrderResponse {
  success: boolean;
  list: Order[];
}
