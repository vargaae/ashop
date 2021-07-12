import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{
  products$;
  categories$;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    ) { 
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }



}
