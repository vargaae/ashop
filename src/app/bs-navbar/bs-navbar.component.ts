import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { fade, slide } from '../animations';
import { AuthService } from '../services/auth.service';
import { AppUser } from './../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;

  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$
      .subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
}

}
