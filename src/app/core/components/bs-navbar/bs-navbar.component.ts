import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { fade, slide } from '../../../animations';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  animations: [fade, slide],
})
export class BsNavbarComponent implements OnInit {
  user: Observable<any>;
  emailSignInSubscription: Subscription;
  appUser: AppUser;
  googleSignInSubscription: Subscription;

  cart$: Observable<ShoppingCart>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.user = null;
  }

  async ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      console.log('Dashboard: user', user);

      if (user) {
        let emailLower = user.email.toLowerCase();
        this.user = this.firestore
          .collection('users')
          .doc(emailLower)
          .valueChanges();
      }
    });
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logoutUser();
    this.emailSignInSubscription.unsubscribe();
    this.googleSignInSubscription.unsubscribe();
  }
}
