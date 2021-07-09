import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { fade, slide } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class AppComponent {

  title = "Andras Varga's GastroApp Project 2021";

  constructor(
    private userService: UserService, 
    private auth: AuthService, 
    router: Router
    ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }

}
