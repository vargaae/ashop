import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    // this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
    }

  ngOnInit() {
    this.orders$ = this.authService.user$
      .pipe(switchMap(user => {
        return this.orderService.getOrdersByUser(user.uid);
      }));
  }

}
