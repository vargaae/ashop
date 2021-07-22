import { AuthService } from './../../../services/auth.service';
import { OrderService } from './../../../services/order.service';
import { ShoppingCart } from './../../../models/shopping-cart';
import { Shipping } from './../../../models/shipping';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Order } from './../../../models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping: Shipping={} as Shipping;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
    ) {}

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
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
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
// result.key is the route parameter; we should note that this is key and not $key, $key is used when we read a node from Firebase but key is used when we store something in Firebase so Firebase returns this newly generated id in this key property


    // console.log(this.shipping);
  }

}
