import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BaseService } from '@app/core/services/base.service';
import { Checkout } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CheckoutService extends BaseService {
  constructor(private router: Router, private httpClient: HttpClient) {
    super(httpClient);
  }

  checkout(checkoutRequest: Checkout) {
    return this.basePost<any>(`${environment.apiUrl}/checkout/checkout`, { BookIds: checkoutRequest.bookIds });
  }
}
