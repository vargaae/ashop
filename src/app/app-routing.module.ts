import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
// import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
// import { ProductFormComponent } from './admin/components/product-form/product-form.component';
// import { AdminAuthGuard } from './admin/services/admin-auth.guard';
// import { HomeComponent } from './core/components/home/home.component';
// import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
// import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./membership/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
//   ],
//   exports: [RouterModule],
//   providers: [AuthGuard],
// })
// export class AppRoutingModule {}