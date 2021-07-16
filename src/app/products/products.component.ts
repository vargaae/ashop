import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { fade, slide } from '../animations';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


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
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
    productService
    .getAll()
      .pipe(switchMap(products => {
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
   this.cart$ = await this.shoppingCartService.getCart();
   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
