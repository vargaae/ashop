import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

import { OrderSuccessComponent } from './order-success.component';

const routes: Routes = [
  { path: '', component: OrderSuccessComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class OrderSuccessRoutingModule { }
