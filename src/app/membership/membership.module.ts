import { MembershipRoutingModule } from './membership-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';



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
