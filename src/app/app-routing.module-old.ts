import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./shopping/shopping.module').then(
        (value) => value.ShoppingModule
      ),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./shopping/components/shopping-cart/shopping-cart.module').then(
        (value) => value.ShoppingCartModule
      ),
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('./membership/components/signup/signup.module').then(
        (m) => m.SignupModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./membership/components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import(
        './membership/components/admin-dashboard/admin-dashboard.module'
      ).then((m) => m.AdminDashboardModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import(
        './membership/components/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./membership/components/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./membership/membership.module').then(
        (value) => value.MembershipModule
      ),
  },

  {
    path: 'check-out',
    loadChildren: () =>
      import('./shopping/components/check-out/check-out.module').then(
        (value) => value.CheckOutModule
      ),
  },
  {
    path: 'order-success/:id',
    loadChildren: () =>
      import('./shopping/components/order-success/order-success.module').then(
        (value) => value.OrderSuccessModule
      ),
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my/orders',
    loadChildren: () =>
      import('./shopping/components/my-orders/my-orders.module').then(
        (value) => value.MyOrdersModule
      ),
  },

  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/admin-products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/admin-orders',
    component: AdminOrdersComponent,
    loadChildren: () =>
      import('./admin/components/admin-orders/admin-orders.module').then(
        (value) => value.AdminOrdersModule
      ),
  },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
