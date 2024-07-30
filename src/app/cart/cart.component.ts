import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, Cart, Checkout } from '@app/_models';

import { AccountService, AlertService, CartService, CheckoutService } from '@app/_services';
import { first, Subscription } from 'rxjs';

@Component({ templateUrl: 'cart.component.html' })
export class CartComponent implements OnInit, OnDestroy {
  user: User | null;
  allCartItems: Array<Cart> | null = [];
  totalPrice: number | undefined = 0;
  subscription!: Subscription;

  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private alertService: AlertService,
    private checkoutService: CheckoutService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.loadAllCartItems();
  }

  private loadAllCartItems() {
    this.allCartItems = this.cartService.getAllCartItems();
    this.totalPrice = this.allCartItems?.reduce((acc, x) => acc + (x.item?.price || 0), 0);
  }

  Checkout() {
    // prepare bookIds
    let allBookIds: Array<number> = [];
    this.allCartItems?.forEach(x=>{
      allBookIds.push(Number(x.item?.id));
    });

    var checkout = {
      bookIds: allBookIds
    } as Checkout

    this.checkoutService.checkout(checkout).subscribe(response => {
      if(response && response?.result === "success"){
        this.cartService.removeItemsFromCart();
        this.allCartItems = [];
      }
      this.alertService.success(response.message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
    this.allCartItems = null;
  }
}
