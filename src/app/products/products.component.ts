import { ShoppingCartItem } from './../models/shopping-cart-item';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { fade, slide } from '../animations';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    fade,
    slide
  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: ShoppingCartItem;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
    ) {
    productService
    .getAll()
      .pipe(switchMap((products: Product[]) => {
      this.products = products;
      return route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;

  });
  }

  async ngOnInit() {
   this.subscription = (await this.cartService.getCart())
   .subscribe(cart =>
      this.cart = cart);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
