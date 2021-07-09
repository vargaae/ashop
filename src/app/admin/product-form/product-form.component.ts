import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { fade, slide } from 'src/app/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
    ) { 
    this.categories$ = categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
