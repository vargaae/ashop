import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

import { MyOrdersComponent } from './my-orders.component';

const routes: Routes = [
  { path: '', component: MyOrdersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class MyOrdersRoutingModule {}
