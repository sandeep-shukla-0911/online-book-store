import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { BaseService } from '@app/core/services/base.service';
import { Orders } from '@app/_models/orders';


@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService{

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        super(httpClient);
    }

    getAll() {
        return this.baseGet<Orders[]>(`${environment.apiUrl}/orders/getallorders`);
    }

    getById(id: string) {
        return this.httpClient.get<User>(`${environment.apiUrl}/orders/getordersdetails/${id}`);
    }
}