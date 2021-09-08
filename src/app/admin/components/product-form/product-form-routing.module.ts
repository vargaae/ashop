import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

import { AdminAuthGuard } from '../../services/admin-auth.guard';

const routes: Routes = [
  // {
  //   path: 'admin/products/new',
  //   component: ProductFormComponent,
  //   canActivate: [AuthGuard, AdminAuthGuard],
  // },
  // {
  //   path: 'admin/products/:id',
  //   component: ProductFormComponent,
  //   canActivate: [AuthGuard, AdminAuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class ProductFormRoutingModule { }
