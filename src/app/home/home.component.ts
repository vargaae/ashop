import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user$: Observable<firebase.default.User>;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

}