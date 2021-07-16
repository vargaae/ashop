import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  product;
  id;

  constructor(private db: AngularFireDatabase,
    private productService: ProductService) {

    if (this.id) this.productService.get(this.id)
        .pipe(take(1))
        .subscribe(p => this.product = p);
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .pipe(map((x: any) => new ShoppingCart(x.items)));
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

  async addToCart(product: Product) {
      let cartId = await this.getOrCreateCartId();
      let item$ = this.getItem(cartId, product.id);

      item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
        if (item.payload.exists()) {
            item$.update({ product: product, quantity: (item.payload.val().quantity) + 1 });
            console.log(item.type);
            console.log(item.key)
            console.log(item.payload.val())
            console.log(item.payload.val().quantity)
        } else {
            item$.set({ product: product, quantity: 1 });
        }
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists(), item.payload.val().quantity >= 0) {
          item$.update({ product: product, quantity: (item.payload.val().quantity) - 1 });
          console.log(item.type);
          console.log(item.key)
          console.log(item.payload.val())
          console.log(item.payload.val().quantity)
      }
  });
}

async updateItemQuantity(product: Product, change: number, emptyCart: number) {
  let cartId = await this.getOrCreateCartId();
  let item$ = this.getItem(cartId, product.id);

  item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
    if (item.payload.exists()) {
        item$.update({ product: product, quantity: (item.payload.val().quantity) + change });
        console.log(item.type);
        console.log(item.key)
        console.log(item.payload.val())
        console.log(item.payload.val().quantity)
    } else {
        item$.set({ product: product, quantity: emptyCart });
    }
});
}

}
