import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

import { AdminAuthGuard } from '../../services/admin-auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AdminProductsComponent,
  //   canActivate: [AuthGuard, AdminAuthGuard],
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AdminProductsRoutingModule { }
