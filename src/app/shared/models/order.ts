import { Shipping } from './shipping';
import { ShoppingCart } from "./shopping-cart";

export class Order {
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  datePlaced: number;
  items: any[];
  // $key: string;

  constructor(public userId: string, public shipping: Shipping, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
    // we want to get the items from the shopping cart and map them to a new structure
  }
}
