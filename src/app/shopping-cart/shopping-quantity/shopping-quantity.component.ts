import { Product } from '../../shared/models/product';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-quantity',
  templateUrl: './shopping-quantity.component.html',
  styleUrls: ['./shopping-quantity.component.css']
})
export class ShoppingQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.shoppingCartService.addToShoppingCart(this.product);
        // if we don't have a cartId we want to create it, so we should talk to Firebase and that means that we need a service called shoppingCartService
  }

  removeFromCart() {
    this.shoppingCartService.removeFromShoppingCart(this.product);
  }

}
