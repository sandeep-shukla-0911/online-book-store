import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@app/_models';
import { BaseService } from '@app/core/services/base.service';
import { Cart } from '@app/_models/cart';
import { AccountService } from './account.service';


@Injectable({ providedIn: 'root' })
export class CartService extends BaseService{
    private readonly CART_ITEMS : string = 'cartItems';
    private cartSubject: BehaviorSubject<Cart[] | null>;
    public cart: Observable<Cart[] | null>;
    public user: User | null = null;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private accountService: AccountService,
    ) {
        super(httpClient);
        this.user = this.accountService.userValue;

        this.cartSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(this.CART_ITEMS)!));
        this.cart = this.cartSubject.asObservable();
    }

    public get cartValue() {
        return this.cartSubject.value;
    }

    addItemsToCart(cartItems: Cart) {
        // check if already items exist in cart
        var existingCart : Cart[] = JSON.parse(localStorage.getItem(this.CART_ITEMS)!);
        if(existingCart && existingCart.length > 0) {
            existingCart.push(cartItems);
            localStorage.setItem(this.CART_ITEMS, JSON.stringify(existingCart));
            this.cartSubject.next(existingCart);
        } else {
            var newCartItems: Cart[] = [];
            newCartItems.push(cartItems);
            localStorage.setItem(this.CART_ITEMS, JSON.stringify(newCartItems));
            this.cartSubject.next(newCartItems);
        }
    }

    removeItemsFromCart() {
        // check if already items exist in cart
        var existingCart : Cart[] = JSON.parse(localStorage.getItem(this.CART_ITEMS)!);
        if(existingCart && existingCart.length > 0) {
            //fetch all items from cart except the current user
            var existingCartItemsForAllOtherUsers = existingCart.filter(x => x.userId !== this.user?.id);
            //update the cart items in local storage
            localStorage.setItem(this.CART_ITEMS, JSON.stringify(existingCartItemsForAllOtherUsers));
            this.cartSubject.next(existingCart);
        } else {
            this.cartSubject.next(null);
        }
    }

    getAllCartItems() {
        var existingCart : Cart[] = JSON.parse(localStorage.getItem(this.CART_ITEMS)!);
        if(existingCart){
            // return all cart items for current user
            return existingCart.filter(x => x.userId === this.user?.id);
           
        } else {
            return null
        }
    }
}