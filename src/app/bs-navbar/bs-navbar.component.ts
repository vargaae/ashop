import { Component } from '@angular/core';
import { fade, slide } from '../animations';
import { AuthService } from '../services/auth.service';
import { AppUser } from './../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(public auth: AuthService) {
      auth.appUser$
      .subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
}

}