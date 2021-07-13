import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
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
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
    ) { 
    productService.getAll()
      .subscribe(products => { 
      this.products = products;

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
    });

  })

    this.categories$ = categoryService.getAll();
  }



}
