import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from './../shared/shared.module';
// import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TopButtonComponent } from './components/top-button/top-button.component';

@NgModule({
  declarations: [HomeComponent, TopButtonComponent],
  // declarations: [BsNavbarComponent, HomeComponent, TopButtonComponent],
  imports: [SharedModule, AppRoutingModule],
  // exports: [BsNavbarComponent],
})
export class CoreModule {}
