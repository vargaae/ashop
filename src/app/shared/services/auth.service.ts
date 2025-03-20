import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithRedirect, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, onAuthStateChanged, UserCredential, User, GoogleAuthProvider } from '@angular/fire/auth'; // Importing from modular API
import { Firestore, collection, addDoc, setDoc, doc } from '@angular/fire/firestore'; // Import Firestore from modular API
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
// import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean;
  authState: any;
  // user$: Observable<firebase.default.User | User | null>;
  // user$: Observable<firebase.default.User>;
  user$: Observable<User | null>;  // Updated type to support null

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    // private afAuth: AngularFireAuth,
    private auth: Auth,  // Firebase Auth service injected
    private afs: Firestore
  ) {
    // this.user$ = afAuth.authState;
    this.user$ = new Observable<User | null>((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });


    this.userLoggedIn = false;

    onAuthStateChanged(this.auth, (user) => {
      this.userLoggedIn = !!user;
    });
  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const provider = new GoogleAuthProvider(); // Correct instantiation of GoogleAuthProvider
    signInWithRedirect(this.auth, provider); // Using modular signInWithRedirect method
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  get appUser$(): Observable<AppUser | null> {  // Handle null case
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);
        // TODO: Use .valueChanges() to get real-time data. ???

        return of(null);
      })
    );
  }

  loginUser(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        return { isValid: true, message: 'Login successful' };
      })
      .catch((error: any) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        return { isValid: false, message: error.message };
      });
  }


  signupUser(user: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((result: UserCredential) => {
        let emailLower = user.email.toLowerCase();

        // Save the user data to Firestore
        setDoc(doc(this.afs, 'users', emailLower), {
          accountType: 'endUser',
          displayName: user.displayName,
          displayName_lower: user.displayName.toLowerCase(),
          email: user.email,
          email_lower: emailLower,
        });

        if (result.user) {
          sendEmailVerification(result.user);  // Send verification email after registration
        }
        return { isValid: true, message: 'Signup successful' };
      })
      .catch((error: any) => {
        console.log('Auth Service: signup error', error);
        return { isValid: false, message: error.message };
      });
  }

  resetPassword(email: string): Promise<any> {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => {
        console.log('Auth Service: reset password success');
      })
      .catch((error: any) => {
        console.log('Auth Service: reset password error...');
        console.log(error.code);
        console.log(error);
        if (error.code) return error;
      });
  }

  async resendVerificationEmail() {
    const user = this.auth.currentUser;
    if (user) {
      return sendEmailVerification(user)
        .then(() => {})
        .catch((error: any) => {
          console.log('Auth Service: sendVerificationEmail error...');
          console.log('error code', error.code);
          console.log('error', error);
          if (error.code) return error;
        });
    } else {
      console.log('No current user found.');
      return null;
    }
  }


  logoutUser(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }

  setUserInfo(payload: object) {
    console.log('Auth Service: saving user info...');
    addDoc(collection(this.afs, 'users'), payload)
      .then((res: any) => {
        console.log('Auth Service: setUserInfo response...');
        console.log(res);
      })
      .catch((error: any) => {
        console.log('Auth Service: setUserInfo error...', error);
      });
  }

  getCurrentUser() {
    return this.auth.currentUser; // returns user object for logged-in users, otherwise returns null
  }
}