import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { fade, slide } from '../../../animations';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  animations: [ fade, slide ]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;

  cart$: Observable<ShoppingCart>;

  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
    ) {

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
