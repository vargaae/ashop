import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../../shared/shared.module';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailComponent } from './verify-email.component';

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [CommonModule, SharedModule, VerifyEmailRoutingModule],
})
export class VerifyEmailModule {}
