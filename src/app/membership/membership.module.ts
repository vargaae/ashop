import { MembershipRoutingModule } from './membership-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MembershipRoutingModule,
    SharedModule
  ]
})
export class MembershipModule { }
