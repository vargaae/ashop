import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  product;
  id: any;

  constructor(
    private db: AngularFireDatabase,
    private productService: ProductService
  ) {
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item.payload.exists()) {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: item.payload.val().quantity + 1,
          });
        } else {
          item$.set({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1,
          });
        }
      });
  }

  async addToProductsCart(product: Product) {
    this.updateShoppingItem(product, product.id, 1);
  }

  async removeFromProductsCart(product: Product) {
    this.updateShoppingItem(product, product.id, -1);
  }

  async addToShoppingCart(product: Product) {
    this.updateShoppingItem(product, product.key, 1);
  }

  async removeFromShoppingCart(product: Product) {
    this.updateShoppingItem(product, product.key, -1);
  }

  private async updateShoppingItem(
    product: Product,
    changeKey: string,
    change: number
  ) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, changeKey);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity = item.payload.val().quantity + change;

        if (item.payload.exists()) {
          if (quantity === 0) {
            item$.remove();
          }
          else {
            item$.update({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: quantity,
            });
          }
        } else {
          item$.set({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: change,
          });
        }
      });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
}
