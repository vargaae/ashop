import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular5-data-table';

import { SharedModule } from '../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth.guard';



@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    SharedModule,
    // RouterModule.forChild([]),
    DataTableModule.forRoot()
  ],
      providers: [ AdminAuthGuard ]
})
export class AdminModule { }
