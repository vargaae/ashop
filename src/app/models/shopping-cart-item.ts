import { ShoppingCart } from './shopping-cart';

export interface ShoppingCartItem {
  key?: string;
  quantity?: number;
  id?: string;
  name?: string;
  title?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
}
