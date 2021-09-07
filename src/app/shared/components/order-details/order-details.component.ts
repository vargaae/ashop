import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  order$;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrderById(this.orderId);
  }

  navigateBack() {
    this.location.back();
  }
}
