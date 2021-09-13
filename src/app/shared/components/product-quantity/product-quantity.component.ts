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
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

    async ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToProductsCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromProductsCart(this.product);
  }
}
