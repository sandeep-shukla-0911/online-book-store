import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { BOOK_STORE_GLOBAL_CONSTANTS, MESSAGES } from '@app/_shared/constants';
import { BaseService } from '@app/core/services';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable()
export class ErrorInterceptor extends BaseService implements HttpInterceptor {

    private isRefreshingToken = false;
    private readonly refreshTokenSubject: BehaviorSubject<string| null> = new BehaviorSubject<string|null>(null)
    
    constructor(private accountService: AccountService,  private httpClient: HttpClient) {
        super(httpClient);
    };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();                
            }

            const error = err.error?.message || err.statusText;
            return throwError(() => error);
        }))
    }

    refreshTokenWhenUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.refreshTokenSubject.next(null);
            return this.refreshAndStoreAccessToken().pipe(
                switchMap((token: string) => {
                    this.isRefreshingToken = false;
                    this.refreshTokenSubject.next(token);
                    return next.handle(this.getRequest(request));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(BOOK_STORE_GLOBAL_CONSTANTS.RETRY_REQUEST_COUNT_WHEN_UNAUTHORIZED),
                switchMap(() => next.handle(this.getRequest(request)))
            );
        }
    }

    refreshAndStoreAccessToken(): Observable<string> {
        var exisitingUser : User = JSON.parse(localStorage.getItem('user')!);
        if (exisitingUser.token) {
            return of(exisitingUser.token);
        } else {
            return throwError(MESSAGES.TOKEN_UNDEFINED);
        }
    }

    private getRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
        return request.clone({
            setHeaders: this.getToken()
        });
    }

    private getToken(): { [name: string]: string | Array<string> } {
        var exisitingUser : User = JSON.parse(localStorage.getItem('user')!);
        let accessToken = exisitingUser.token;

        if (!accessToken) {
            return {};
        }

        return {
            Authorization: `Bearer ${accessToken}`
        };
    }
}