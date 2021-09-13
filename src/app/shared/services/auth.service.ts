import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean;
  authState: any;
  user$: Observable<firebase.default.User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = afAuth.authState;

    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(
      new firebase.default.auth.GoogleAuthProvider()
    );
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      })
    );
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();

        this.afs.doc('/users/' + emailLower).set({
          accountType: 'endUser',
          displayName: user.displayName,
          displayName_lower: user.displayName.toLowerCase(),
          email: user.email,
          email_lower: emailLower,
        });

        result.user.sendEmailVerification();
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Auth Service: reset password success');
      })
      .catch((error) => {
        console.log('Auth Service: reset password error...');
        console.log(error.code);
        console.log(error);
        if (error.code) return error;
      });
  }

  async resendVerificationEmail() {
    return (await this.afAuth.currentUser)
      .sendEmailVerification()
      .then(() => {})
      .catch((error) => {
        console.log('Auth Service: sendVerificationEmail error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }

  logoutUser(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }

  setUserInfo(payload: object) {
    console.log('Auth Service: saving user info...');
    this.afs
      .collection('users')
      .add(payload)
      .then(function (res) {
        console.log('Auth Service: setUserInfo response...');
        console.log(res);
      });
  }

  getCurrentUser() {
    return this.afAuth.currentUser; // returns user object for logged-in users, otherwise returns null
  }
}
