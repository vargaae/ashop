import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrderSuccessRoutingModule } from './order-success-routing.module';
import { OrderSuccessComponent } from './order-success.component';


@NgModule({
  declarations: [OrderSuccessComponent],
  imports: [
    SharedModule,
    OrderSuccessRoutingModule
  ]
})
export class OrderSuccessModule { }
