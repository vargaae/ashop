import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingQuantityComponent } from '../shopping-quantity/shopping-quantity.component';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingQuantityComponent
  ],
  imports: [
    SharedModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }
