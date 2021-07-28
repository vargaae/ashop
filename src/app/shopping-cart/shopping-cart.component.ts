import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { fade, slide } from '../animations';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  product: Product;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
    .getAll()
      .pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
   });
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }

}
