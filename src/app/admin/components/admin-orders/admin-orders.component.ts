import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  id;
  order: Order={} as Order;
  key;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService) {
    // this.orders$ = orderService.getOrders();
  }

  ngOnInit() {
    this.orders$ = this.authService.user$
      .pipe(switchMap(user => {
        return this.orderService.getOrdersByUser(user.uid);
      }));

    //   this.id = this.route.snapshot.paramMap.get('id');
    // if (this.id) this.orderService.getOrders(this.id)
    //     .pipe(take(1))
    //     .subscribe(o => this.order = o);
  }

  deleteOrder() {
    if (!confirm('Are you sure you want to delete this order?')) return;

    this.orderService.deleteOrder(this.id);
    // this.orderService.deleteOrder(order.key)
    //   .then(data => {
    //     console.log(data);
    //   });
  }

}
