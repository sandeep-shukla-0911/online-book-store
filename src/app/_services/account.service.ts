import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { BaseService } from '@app/core/services/base.service';
import { BOOK_STORE_GLOBAL_CONSTANTS } from '@app/_shared/constants';


@Injectable({ providedIn: 'root' })
export class AccountService extends BaseService{
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        super(httpClient);
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(BOOK_STORE_GLOBAL_CONSTANTS.USER_KEY)!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.basePost<User>(`${environment.apiUrl}/account/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(BOOK_STORE_GLOBAL_CONSTANTS.USER_KEY, JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem(BOOK_STORE_GLOBAL_CONSTANTS.USER_KEY);
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }
}