import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Order } from '../models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getAll() {
    return this.db
      .list<Order>('/orders')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((p) => {
            const data = p.payload.val() as Order;
            const id = p.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list<Order>('/orders', (ref) =>
        ref.orderByChild('userId').equalTo(userId)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((o) => {
            const data = o.payload.val() as Order;
            const key = o.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  deleteOrder(orderId: string) {
    return this.db.object('/orders/' + orderId).remove();
  }
}
