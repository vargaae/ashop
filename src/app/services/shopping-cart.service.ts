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
  id: any;

  constructor(private db: AngularFireDatabase,
    private productService: ProductService) {

    if (this.id) this.productService.get(this.id)
        .pipe(take(1))
        .subscribe(p => this.product = p);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    // this.updateItem(product, 1, 1);

      let cartId = await this.getOrCreateCartId();
      let item$ = this.getItem(cartId, product.id);

      item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
        if (item.payload.exists()) {
            item$.update({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: (item.payload.val().quantity) + 1
            });
            // console.log(item.type);
            // console.log(item.key)
            // console.log(item.payload.val())
            // console.log(item.payload.val().quantity)
        } else {
            item$.set({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: 1 });
        }
    });
  }

//   async removeFromCart(product: Product) {
//     let cartId = await this.getOrCreateCartId();
//     let item$ = this.getItem(cartId, product.id);

//     item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
//       let quantity = (item.payload.val().quantity) - 1

//       if (item.payload.exists()) {
//         if (quantity === 0) item$.remove();

//         else item$.update({
//             title: product.title,
//             imageUrl: product.imageUrl,
//             price: product.price,
//             quantity: quantity
//           });
//           // console.log(item.type);
//           // console.log(item.key)
//           // console.log(item.payload.val())
//           // console.log(item.payload.val().quantity)
//       }
//   });
// }

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

private async updateShoppingItem(product: Product, changeKey: string, change: number) {
  let cartId = await this.getOrCreateCartId();
  let item$ = this.getItem(cartId, changeKey);

  item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
    let quantity = (item.payload.val().quantity) + change;

    if (item.payload.exists()) {
      if (quantity === 0) { item$.remove(); }
      // we want to remove the item with quantity 0 from the shopping cart; else we want to update it
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
      });
    }
  } else {
      item$.set({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: change
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
      dateCreated: new Date().getTime()
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

// REFRACTORING : - || 0 ->didn't work somehow?!
// async updateItem(product: Product, change: number) {
//   let cartId = await this.getOrCreateCartId();
//   let item$ = this.getItem(cartId, product.id);

//   item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
//         item$.update({
//               title: product.title,
//               imageUrl: product.imageUrl,
//               price: product.price,
//               quantity: (item.payload.val().quantity || 0) + change
//              });
// });
// }

}
