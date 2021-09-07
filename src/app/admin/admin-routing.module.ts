import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersComponent } from '../admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '../admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from '../admin/components/product-form/product-form.component';
import { AdminAuthGuard } from '../admin/services/admin-auth.guard';
import { HomeComponent } from '../core/components/home/home.component';
import { AuthGuard } from '../shared/services/auth.guard';


const adminRoutes: Routes = [
  // { path: '', component: HomeComponent },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/admin-products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/admin-orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AdminRoutingModule { }
