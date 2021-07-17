import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  // removeFromCart() {
  //   this.shoppingCartService.removeFromCart(this.product);
  // }
  // getQuantity(product: Product) {
  //   if (!this.shoppingCart) return 0;
  //   let item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }
  //   only this we could use here, because of the Observable, there will be a little bit delay:
  //   if (!this.shoppingCart) { return 0; }
    //   // while we get the shopping cart from Firebase there's going to be some delay and during that time this shopping cart is going to be null and we would get a null reference exception in the code below and we don't want that to happen; so at first it would show 0 for the the number of itemsMap in shopping cart and if there are some itemsMap in it the 0 will update to quantity amount


}
