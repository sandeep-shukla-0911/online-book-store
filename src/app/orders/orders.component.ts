import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, Orders } from '@app/_models';

import { AccountService } from '@app/_services';
import { OrderService } from '@app/_services/';
import { first, Subscription } from 'rxjs';

@Component({ templateUrl: 'orders.component.html' })
export class OrdersComponent implements OnInit, OnDestroy {
  user: User | null;
  allOrders: Array<Orders> | null = [];
  subscription!: Subscription;

  constructor(
    private accountService: AccountService,
    private ordersService: OrderService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.loadAllOrders();
  }

  private loadAllOrders() {
    this.subscription = this.ordersService
      .getAll()
      .pipe(first())
      .subscribe((orders) => {
        this.allOrders = orders;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
    this.allOrders = null;
  }
}
