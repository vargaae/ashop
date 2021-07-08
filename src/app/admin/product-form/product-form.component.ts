import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories().valueChanges();
  }

  ngOnInit() {
  }

}
