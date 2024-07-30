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

        this.cartSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('cartItems')!));
        this.cart = this.cartSubject.asObservable();
    }

    public get cartValue() {
        return this.cartSubject.value;
    }

    addItemsToCart(cartItems: Cart) {
        // check if already items exist in cart
        var existingCart : Cart[] = JSON.parse(localStorage.getItem('cartItems')!);
        if(existingCart && existingCart.length > 0) {
            existingCart.push(cartItems);
            localStorage.setItem('cartItems', JSON.stringify(existingCart));
            this.cartSubject.next(existingCart);
        } else {
            var newCartItems: Cart[] = [];
            newCartItems.push(cartItems);
            localStorage.setItem('cartItems', JSON.stringify(newCartItems));
            this.cartSubject.next(newCartItems);
        }
    }

    removeItemsFromCart() {
        // check if already items exist in cart
        var existingCart : Cart[] = JSON.parse(localStorage.getItem('cartItems')!);
        if(existingCart && existingCart.length > 0) {
            //fetch all items from cart except the current user
            var existingCartItemsForAllOtherUsers = existingCart.filter(x => x.userId !== this.user?.id);
            //update the cart items in local storage
            localStorage.setItem('cartItems', JSON.stringify(existingCartItemsForAllOtherUsers));
            this.cartSubject.next(existingCart);
        } else {
            this.cartSubject.next(null);
        }
    }

    getAllCartItems() {
        console.log('getAllCartItems')
        var existingCart : Cart[] = JSON.parse(localStorage.getItem('cartItems')!);
        if(existingCart){
            // return all cart items for current user
            return existingCart.filter(x => x.userId === this.user?.id);
           
        } else {
            return null
        }
    }
}