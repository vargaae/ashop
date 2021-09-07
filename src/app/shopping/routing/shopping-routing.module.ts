import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from '../components/products/products.component';

const shoppingRoutes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
