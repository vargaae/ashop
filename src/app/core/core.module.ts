import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent
  ],
  imports: [ SharedModule ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
