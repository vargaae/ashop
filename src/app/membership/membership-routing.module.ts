import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const membershipRoutes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(membershipRoutes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }
