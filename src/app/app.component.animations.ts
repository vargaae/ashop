import { fade, slide, bounceOutLeftAnimation } from './animations';
import { animate, style, transition, trigger, useAnimation } from '@angular/animations';

export const todoAnimation = trigger('todoAnimation', [
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