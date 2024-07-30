import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { BaseService } from '@app/core/services/base.service';
import { Books } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class BooksService extends BaseService{

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        super(httpClient);
    }

    getAll() {
        return this.baseGet<Books[]>(`${environment.apiUrl}/books/getallbooks`);
    }

    getById(id: string) {
        return this.httpClient.get<User>(`${environment.apiUrl}/books/get-book-details/${id}`);
    }
}