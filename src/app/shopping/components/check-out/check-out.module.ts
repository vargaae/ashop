import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from '../shopping-cart-summary/shopping-cart-summary.component';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';

@NgModule({
  declarations: [
    CheckOutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [SharedModule, CheckOutRoutingModule],
})
export class CheckOutModule {}
