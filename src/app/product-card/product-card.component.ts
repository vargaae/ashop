import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
        console.log(this.shoppingCart.items);
    return item ? item.quantity : 0;
  // console.log(this.product.key);
    // console.log(this.shoppingCart);
  }
}
