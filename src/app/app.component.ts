import { Component } from '@angular/core';
import { Cart, User } from './_models';
import { AccountService, CartService } from './_services';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user?: User | null;
  allCartItems: Array<Cart> | null = [];
  private cartSubject =  this.cartService.cart

  constructor(private accountService: AccountService, private router: Router, private cartService: CartService) {
    this.accountService.user.subscribe((x) => (this.user = x));
    this.verifyUser();
  }

  ngOnInit() {
    this.cartSubject?.subscribe((x) => (this.getCartItemsAndCount()));
  }

  verifyUser() {
    const user = this.accountService.userValue;
    if (user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login']);
    return false;
  }

  getCartItemsAndCount() {
    const user = this.accountService.userValue;
    if(user) {
      this.allCartItems =  this.cartService.getAllCartItems();
    }
  }
    
  logout() {
    this.accountService.logout();
  }
}
