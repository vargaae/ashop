import { ShoppingCart } from './../../../models/shopping-cart';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { todosAnimation, todoAnimation } from './check-out.component.animations';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  animations: [ todosAnimation, todoAnimation ]
})

export class CheckOutComponent implements OnInit {
  // shipping: Shipping={} as Shipping;
  // cart: ShoppingCart;
  cart$: Observable<ShoppingCart>;
  // cartSubscription: Subscription;
    // ONE WAY TO DO THIS IS WITH SUBSCRIPTION; THE OTHER IS WITH PASSING AN OBSERVABLE TO OUR TEMPLATE AND UNWRAP IT THERE WITH THE ASYNC PIPE

  constructor(private shoppingCartService: ShoppingCartService) {}

// async ngOnInit() {
//     let cart$ = await this.shoppingCartService.getCart();
//     this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
  //   // getCart() returns a promise so we await that, which means we should make this method async; now we can get the actual shopping cart with subscribing to this observable
  // }
  // in this method we read the shopping cart; here we need an actual shopping cart, not an observable because we want to directly access the items in the shopping cart
  // ONE WAY TO DO THIS IS WITH SUBSCRIPTION; THE OTHER IS WITH PASSING AN OBSERVABLE TO OUR TEMPLATE AND UNWRAP IT THERE WITH THE ASYNC PIPE

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  // ngOnDestroy() {
  //   this.cartSubscription.unsubscribe();
  // }

   // ONE WAY TO DO THIS IS WITH SUBSCRIPTION; THE OTHER IS WITH PASSING AN OBSERVABLE TO OUR TEMPLATE AND UNWRAP IT THERE WITH THE ASYNC PIPE

  // with this implementation we're communicating with the other components through their Inputs, so we no longer need to subscribe to this here; we can simply pass our shopping cart observable to our template, unwrap it here once and then pass that actual shopping cart object to our child components


//   async placeOrder(shipping: Shipping) {
//     let order = new Order(this.userId, this.shipping, this.cart);
//     // moved to Order class:
//     // this is the code before the refactoring below, a much cleaner way

//     // let order = {
//     //   userId: this.userId,
//     //   datePlaced: new Date().getTime(),
//     //   shipping: this.shipping,
//     //   items: this.cart.items.map(i => {
//     //     return {
//     //       product: {
//     //         title: i.title,
//     //         imageUrl: i.imageUrl,
//     //         price: i.price
//     //       },
//     //       quantity: i.quantity,
//     //       totalPrice: i.totalPrice
//     //     }
//     //   })
//     // we want to get the items from the shopping cart and map them to a new structure

//     // };
//     let result = await this.orderService.placeOrder(order);
//     this.router.navigate(['/order-success', result.key]);
// // result.key is the route parameter; we should note that this is key and not $key, $key is used when we read a node from Firebase but key is used when we store something in Firebase so Firebase returns this newly generated id in this key property


//     // console.log(this.shipping);
//   }

  //   // this.orderService.placeOrder(order).then(result => {
  //   //   this.router.navigate(['/order-success', result.key]);
  //   // });
  //   // this is the same as the code below, the only difference is there we await for the result and that's why we need to add async in front of our method's name

  //   // now that we have an order object we can call the orderService and pass this order to the placeOrder() method
  //   let result = await this.orderService.placeOrder(order);
}
