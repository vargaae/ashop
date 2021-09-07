import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AuthGuard } from './services/auth.guard';

const sharedRoutes: Routes = [
  { path: '', component: OrderDetailsComponent },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sharedRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class SharedRoutingModule {}
