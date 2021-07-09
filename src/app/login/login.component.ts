import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { fadeLogin } from '../animations';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeLogin
  ]
})
export class LoginComponent {

  constructor(
    public auth: AuthService, 
    private router: Router
    ) {
    
   }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

}