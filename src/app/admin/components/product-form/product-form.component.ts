import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { fade, slide } from 'src/app/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [ fade, slide ]
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product: Product={} as Product;
  // minDate = new Date(2021, 7, 1);
  // maxDate = new Date(2021, 8, 1);
  minDate: Date;
  maxDate: Date;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id)
        .pipe(take(1))
        .subscribe(p => this.product = p);

    // Set the minimum to January 1st 1 year in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['/admin/admin-products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/admin-products']);

  }

  ngOnInit(): void  {
  }

}
