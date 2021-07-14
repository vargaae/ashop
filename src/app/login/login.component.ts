import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { fade } from '../animations';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fade
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