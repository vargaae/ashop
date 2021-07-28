import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  // cart$;

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

    async ngOnInit() {
    // this.cart$ = await this.shoppingCartService.getCart();
  }

  addToCart() {
    this.shoppingCartService.addToProductsCart(this.product);
        // if we don't have a cartId we want to create it, so we should talk to Firebase and that means that we need a service called shoppingCartService
  }

  removeFromCart() {
    this.shoppingCartService.removeFromProductsCart(this.product);
  }

}
