import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../shared/models/product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-quantity',
  templateUrl: './shopping-quantity.component.html',
  styleUrls: ['./shopping-quantity.component.css'],
})
export class ShoppingQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.shoppingCartService.addToShoppingCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromShoppingCart(this.product);
  }
}
