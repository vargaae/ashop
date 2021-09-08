import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { MembershipRoutingModule } from './membership-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MembershipRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MembershipModule { }
