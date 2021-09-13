import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { fade, slide } from '../../../animations';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fade, slide],
})
export class HomeComponent implements OnInit {
  anonymous = 'Visitor';
  user: Observable<any>;
  user$: Observable<firebase.default.User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = afAuth.authState;
  }

  ngOnInit(): void {
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
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
