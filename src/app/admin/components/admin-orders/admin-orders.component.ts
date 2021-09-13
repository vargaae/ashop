import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap((user) => {
        return this.orderService.getAll();
      })
    );
  }

  deleteOrder(orderCustomer: string, orderId: string, orderDate: Date) {
    const orderDateString = formatDate(
      orderDate,
      'MMMM d, y, h:mm:ss a z',
      'en'
    );
    if (
      !confirm(
        'Are you sure you want to delete this order: \n' +
          'Customer: ' +
          orderCustomer +
          ',\n' +
          'Order Placed on: ' +
          orderDateString +
          ', \n' +
          'OrderID: ' +
          orderId +
          ' ?'
      )
    )
      return;

    this.orderService.deleteOrder(orderId);
  }
}
