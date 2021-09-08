import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminOrdersRoutingModule } from './admin-orders-routing.module';
import { AdminOrdersComponent } from './admin-orders.component';


@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminOrdersRoutingModule
  ]
})
export class AdminOrdersModule { }
