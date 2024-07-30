import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BooksRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        BooksComponent
    ]
})
export class BooksModule { }