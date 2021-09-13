import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular5-data-table';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';



@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    DataTableModule.forRoot()
  ]
})
export class AdminModule { }
