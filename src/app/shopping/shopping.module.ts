import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingRoutingModule } from './routing/shopping-routing.module';

@NgModule({
  declarations: [ProductsComponent, ProductFilterComponent],
  imports: [SharedModule, ShoppingRoutingModule],
})
export class ShoppingModule {}
