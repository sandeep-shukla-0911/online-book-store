import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const HomeModule = () => import('./home/home.module').then(x => x.HomeModule);
const booksModule = () => import('./books/books.module').then(x => x.BooksModule);
const ordersModule = () => import('./orders/orders.module').then(x => x.OrdersModule);
const cartModule = () => import('./cart/cart.module').then(x => x.CartModule);

const routes: Routes = [
  { path: '', loadChildren: HomeModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'books', loadChildren: booksModule },
  { path: 'orders', loadChildren: ordersModule },
  { path: 'cart', loadChildren: cartModule },
  // otherwise redirect to home
  { path: '**', redirectTo: '', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
