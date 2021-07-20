import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  storeOrder(order) {
    return this.db.list('/orders').push(order);
  }

  async placeOrder(order) {
    // return this.db.list('/orders').push(order);
    // this returns a promise so we're going to return this to the outside because later we want to get the key of this new order and redirect the user to the order success page

    let result = await this.db.list('/orders').push(order);
    // instead of returning the result immediately we need to await the result and store it in a variable
    // this.cartService.clearCart();
    // right after we store the order we should clear the shopping cart
    return result;
  }
}
