import { Component, OnDestroy, OnInit } from '@angular/core';

import { Books, Cart, User } from '@app/_models';
import { AccountService, AlertService, CartService } from '@app/_services';
import { BooksService } from '@app/_services';
import { MESSAGES } from '@app/_shared/constants';
import { first, Subscription } from 'rxjs';

@Component({ templateUrl: 'books.component.html' })
export class BooksComponent implements OnInit, OnDestroy {
  user: User | null;
  allBooks: Array<Books> | null = [];
  subscription!: Subscription;

  constructor(
    private accountService: AccountService,
    private booksService: BooksService,
    private cartService: CartService,
    private alertService: AlertService

  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.loadAllBooks();
  }

  private loadAllBooks() {
    this.subscription = this.booksService
      .getAll()
      .pipe(first())
      .subscribe((books) => (this.allBooks = books));
  }

  addToCart(book: Books) {
    var cart = {
      userId: this.user?.id,
      item : book
    } as Cart
    this.cartService.addItemsToCart(cart);
    this.alertService.success(MESSAGES.BOOK_ADDED_TO_CART, { autoClose: true });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
    this.allBooks = null;
  }
}
