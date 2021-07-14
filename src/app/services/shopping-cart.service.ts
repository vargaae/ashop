import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ProductService } from './product.service';

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

  private getCart(cartId: string) {
    return this.db.object<Product>('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

  async addToCart(product) {
      let cartId = await this.getOrCreateCartId();

      let item$ = this.getItem(cartId, product.id);

      item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
        if (item.payload.exists()) {
            item$.update({ product: product, quantity: (item.payload.val().quantity) + 1 });
            console.log(item.type);
            console.log(item.key)
            console.log(item.payload.val())
        } else {
            item$.set({ product: product, quantity: 1 });
        }
    });
  }
}
