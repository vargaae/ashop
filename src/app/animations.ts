import { trigger, transition, state, animate, animation, style, keyframes, useAnimation } from '@angular/animations';


export let fade = trigger('fade', [

  state('void', style({opacity: 0})),

  transition(':enter, :leave', [
    animate('2s 1.2s ease-out')
  ]),
]);

export let fadeLogin = trigger('fade', [

  state('void', style({opacity: 0})),

  transition(':enter, :leave', [
    animate(2000)
  ]),
]);

export let bounceOutLeftAnimation = animation(
  animate('0.5s cubic-bezier(.17,.67,.83,.67)', keyframes([
    style({ 
      offset: .2, 
      opacity: 1,
      transform: 'translateX(20px)' 
    }),
    style({ 
      offset: 1, 
      opacity: 0,
      transform: 'translateX(-100%)' 
    }),
])));

export let lightSpeedInLeft = animation(
  animate('1s ease-out', keyframes([
    style({ 
      offset: 0, 
      opacity: 0,
      transform: 'translateX(-100%)' 
    }),
    style({ 
      offset: .6, 
      opacity: 1,
      transform: 'skewX(-20deg)' 
    }),
    style({ 
      offset: .8, 
      transform: 'skewX(5deg)' 
    }),
    style({ 
      offset: 1, 
      transform: 'translateX(0)' 
    }),
])));

export let slide = trigger('slide', [
  transition(':enter', 
    useAnimation(lightSpeedInLeft)),
  // transition(':enter', [
  //   style({ transform: 'translateX(-10px)' }),
  //   animate('0.8s ease-out')
  // ]),

//   transition(':leave', [
//     animate(500, style({ transform: 'translateX(-100%)'}))
//   ])
// ]);
  transition(':leave', 
    useAnimation(bounceOutLeftAnimation)
  )
]);

export let fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '2s',
    easing: 'ease-out'
  }
});
