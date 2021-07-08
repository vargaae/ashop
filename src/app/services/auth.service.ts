import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { Injectable } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute, 
    private afAuth: AngularFireAuth
    ) {
      this.user$ = afAuth.authState;
  }

 loginWithGoogle() {
   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl', returnUrl);
   this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
 }

 logout(): void {
  this.afAuth.signOut();
}

get appUser$() : Observable<AppUser> {
  return this.user$
  .pipe(
    switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();

      return of(null);
    }));
  }

}
