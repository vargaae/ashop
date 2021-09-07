import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

import { CheckOutComponent } from './check-out.component';

const routes: Routes = [
  { path: '', component: CheckOutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class CheckOutRoutingModule {}
