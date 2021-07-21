import { Shipping } from './../../../models/shipping';
import { AuthService } from './../../../services/auth.service';
import { OrderService } from './../../../services/order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../../../models/shopping-cart';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { Router } from '@angular/router';
import { trigger, transition, state, animate, animation, style, keyframes, useAnimation, query } from '@angular/animations';
import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from '../../../animations';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  animations: [
    trigger('todoAnimation', [
      transition(':enter', [
        query('label', [
          style({ transform: 'translateY(-20px)' }),
          animate(1000)
        ])
      ]),

      transition(':enter', [
        query('form-control dede', [
          style({ transform: 'translateY(-20px)' }),
          animate(1000)
        ])
      ]),

      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1500ms'
          }
        })

        // style({ opacity: 0 }),
        // animate(2000)
      ]),
      transition(':leave', [
        style({backgroundColor: 'purple'}),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
     ])
  ]
})

export class CheckOutComponent implements OnInit, OnDestroy {
  userId: string;
  shipping: Shipping={} as Shipping;
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  // shipping: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
    ) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping: Shipping) {
    let order = new Order(this.userId, this.shipping, this.cart);
    // moved to Order class:
    // this is the code before the refactoring below, a much cleaner way

    // let order = {
    //   userId: this.userId,
    //   datePlaced: new Date().getTime(),
    //   shipping: this.shipping,
    //   items: this.cart.items.map(i => {
    //     return {
    //       product: {
    //         title: i.title,
    //         imageUrl: i.imageUrl,
    //         price: i.price
    //       },
    //       quantity: i.quantity,
    //       totalPrice: i.totalPrice
    //     }
    //   })
    // we want to get the items from the shopping cart and map them to a new structure

    // };
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
// result.key is the route parameter; we should note that this is key and not $key, $key is used when we read a node from Firebase but key is used when we store something in Firebase so Firebase returns this newly generated id in this key property


    // console.log(this.shipping);
  }

  //   // this.orderService.placeOrder(order).then(result => {
  //   //   this.router.navigate(['/order-success', result.key]);
  //   // });
  //   // this is the same as the code below, the only difference is there we await for the result and that's why we need to add async in front of our method's name

  //   // now that we have an order object we can call the orderService and pass this order to the placeOrder() method
  //   let result = await this.orderService.placeOrder(order);
}
