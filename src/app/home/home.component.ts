import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { fade, slide } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class HomeComponent {
  name = "Visitor";

  user$: Observable<firebase.default.User>;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

}