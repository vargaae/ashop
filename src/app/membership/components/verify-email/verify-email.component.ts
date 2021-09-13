import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  email: string;
  mailSent: boolean;
  isProgressVisible: boolean;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.email = '';
    this.mailSent = false;
    this.isProgressVisible = false;

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.email = user.email;
      }
    });
  }

  resendVerificationEmail() {
    this.isProgressVisible = true;

    this.authService.resendVerificationEmail().then((result) => {
      this.isProgressVisible = false;
      if (result == null) {
        console.log('verification email resent...');
        this.mailSent = true;
      } else if (result.isValid == false) {
        console.log('verification error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }
}
