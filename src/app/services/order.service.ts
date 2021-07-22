import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    // -> placeOrder() evolved from this storing order without clearing the cart:
  // storeOrder(order) {
    // return this.db.list('/orders').push(order);
    // this returns a promise so we're going to return this to the outside because later we want to get the key of this new order and redirect the user to the order success page

    let result = await this.db.list('/orders').push(order);
    // instead of returning the result immediately we need to await the result and store it in a variable
    this.shoppingCartService.clearCart();
    // right after we store the order we should clear the shopping cart
    return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders').valueChanges();
  }

  // getOrders() {
  //   return this.db.list('/orders').snapshotChanges()
  //   // .pipe(map(data => {
  //   //   return data.map(action => {
  //   //     const $key = action.payload.key;
  //   //     const data = { $key, ...action.payload.val() };
  //   //     return data;
  //   //   });
  //   // }));
  //   // here we simply return the list of orders from Firebase
  // }

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  deleteOrder(id: string) {
    return this.db.list('/orders/' + id).remove();
  }

  // // getOrdersByUser(userId: string) {
  // //   return this.db.list('/orders', {
  // //     query: {
  // //       orderByChild: 'userId',
  // //       equalTo: userId
  // //     }
  // //   });
  // // }

  // getOrdersByUser(userId: string) {
  //   // return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
  //     // .snapshotChanges().pipe(map(data => {
  //     //   return data.map(action => {
  //     //     const $key = action.payload.key;
  //     //     const data = { $key, ...action.payload.val() };
  //     //     return data;
  //     //   });
  //     // }));
  // }

}
