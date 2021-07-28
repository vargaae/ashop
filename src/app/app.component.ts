import { UserService } from './shared/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { fade, slide, bounceOutLeftAnimation } from './animations';
import { animate, style, transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fade,
    slide,
    trigger('todoAnimation', [
      transition(':enter', [
        style({opacity: 0.6, backgroundColor: 'blue'}),
        animate(2000)
      ]),
      transition(':leave', [
        style({backgroundColor: 'blue'}),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
    ])
  ]
})
export class AppComponent {

  title = "Andras Varga's Organic Shop Project 2021";

  constructor(
    private userService: UserService, 
    private auth: AuthService, 
    router: Router
    ) {
    auth.user$.subscribe(user => {
      if (!user) return;
      
      userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return;
      
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      
    })
  }

}
