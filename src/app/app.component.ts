import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { fade, slide } from './animations';
import { todoAnimation } from './app.component.animations';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [todoAnimation, fade, slide],
})
export class AppComponent {
  title = "Andras Varga's Ecommerce Project 2025";

  // TODO: let the services work
  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router
  ) {
    auth.user$.subscribe((user) => {
      if (!user) return;

      // userService.save(user);//-TODO: check if user is working:
      userService.save(user as firebase.default.User);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
