import { switchMap } from 'rxjs/operators';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { fade, slide } from '../animations';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    fade,
    slide
  ]
})
export class ProductsComponent{
  products: Product[] = [];
  filteredProducts: Product[] = [];

  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
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



}
