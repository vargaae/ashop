import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';

// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  user: Observable<any>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          if (!user.emailVerified)
            // if the user hasn't verified their email, send them to that page
            this.router.navigate(['/verify-email']);

          resolve(true);
        } else {
          console.log('Auth Guard: User is not ADMIN User');
          this.router.navigate(['/home']); // a logged out user will always be sent to home
          resolve(false);
        }
      });
    });
    // canActivate(
    //   // route: ActivatedRouteSnapshot,
    //   // state: RouterStateSnapshot
    //   ): Observable<boolean> {
    //     return this.auth.appUser$.pipe(
    //       map(appUser => appUser.isAdmin)
    //       )
  }
}
