import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
    //EMAIL SIGNED IN USER
  user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)
    //GOOGLE SIGN IN APPUSER
  appUser: AppUser;

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
    //EMAIL SIGNED IN USER
    this.afAuth.authState.subscribe(user => {
        console.log('Dashboard: user', user);

        if (user) {
            let emailLower = user.email.toLowerCase();
            this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
        }
    });
    //GOOGLE SIGN IN APPUSER

    this.auth.appUser$
      .subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logoutUser();
}
}
