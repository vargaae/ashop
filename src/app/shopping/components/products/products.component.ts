import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../shared/services/product.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { fade, slide } from '../../../animations';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [ fade, slide ]
})
export class ProductsComponent implements OnInit {
  // @ViewChild(CdkVirtualScrollViewport)
  // viewport: CdkVirtualScrollViewport;

  // batch = 20;
  // theEnd = false;

  // offset = new BehaviorSubject(null);
  // infinite: Observable<any[]>;
    // products$;
  // a field which is an observable of products
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

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

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
