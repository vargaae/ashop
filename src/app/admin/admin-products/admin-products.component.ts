import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  name = '';
  email = "p.title";

  onKeyPressed() {
    console.log(this.email);
  }

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    // this.products$ = 
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    // console.log(query);
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }
 

}
