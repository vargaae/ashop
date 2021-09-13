import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  mailSent: boolean;
  isProgressVisible: boolean;
  forgotPasswordForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.mailSent = false;
    this.isProgressVisible = false;

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.forgotPasswordForm.patchValue({
          email: user.email,
        });
      }
    });
  }

  retrievePassword() {
    this.isProgressVisible = true;
    
    if (this.forgotPasswordForm.invalid) return;

    this.authService
      .resetPassword(this.forgotPasswordForm.value.email)
      .then((result) => {
        this.isProgressVisible = false;
        if (result == null) {
          console.log('password reset email sent...');
          this.mailSent = true;
          this.router.navigate(['/dashboard']);
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
