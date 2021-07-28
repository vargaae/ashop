import { trigger, transition, state, animate, animation, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from '../../../animations';


export const todosAnimation = trigger('todosAnimation', [
    transition(':enter', [
      group([
        query('h2', [
          style({ transform: 'translateY(-20px)' }),
          animate(1000)
        ]),
        query('@todoAnimation',
          stagger(200, animateChild()))
      ])
    ])
  ])

  export const todoAnimation = trigger('todoAnimation', [
    transition(':enter', [
      useAnimation(fadeInAnimation, {
        params: {
          duration: '2s'
        }
      })
    ]),
    transition(':leave', [
      style({backgroundColor: 'purple'}),
      animate(1000),
      useAnimation(bounceOutLeftAnimation)
    ])
   ]);
