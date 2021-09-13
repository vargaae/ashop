import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fade } from '../../../animations';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fade],
})
export class LoginComponent implements OnInit {
  isProgressVisible: boolean;
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe((x) => console.log(x));

    this.isProgressVisible = false;

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    if (this.authService.userLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginUser() {
    this.isProgressVisible = true;

    if (this.loginForm.invalid) return;

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        this.isProgressVisible = false;
        if (result == null) {
          console.log('logging in...');
          this.router.navigate(['/products']);
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
