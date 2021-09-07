import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';


@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    SharedModule,
    MyOrdersRoutingModule
  ]
})
export class MyOrdersModule { }
