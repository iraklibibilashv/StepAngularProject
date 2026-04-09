import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
    path: ``,
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'home',
  loadComponent: () => import('./home/home').then(m => m.Home),
},
{
  path: 'products',
  loadComponent: () => import('./products/products').then(m => m.Products),
},
{
  path: 'cart',
  loadComponent: () => import('./cart/cart').then(m => m.Cart),
  canActivate: [authGuard]
},

{
  path: 'login',
  loadComponent: () => import('./login/login').then(m => m.Login),
},
{
  path: 'register',
  loadComponent: () => import('./register/register').then(m => m.Register),
},
{
  path: 'verify',
  loadComponent: () => import('./verify/verify').then(m => m.Verify),
},
{
  path: 'forgotpassword',
  loadComponent: () => import('./forgotpassword/forgotpassword').then(m => m.Forgotpassword),
},
{
  path: 'resetpassword',
  loadComponent: () => import('./resetpassword/resetpassword').then(m => m.Resetpassword),
},
{
  path: 'details/:id',
  loadComponent: () => import('./details/details').then(m => m.Details),
},
{
  path: 'myaccount',
  loadComponent: () => import('./myaccount/myaccount').then(m => m.Myaccount),
  canActivate: [authGuard]
},
{
  path: 'wishlist',
  loadComponent: () => import('./wishlist/wishlist').then(m => m.Wishlist),
  canActivate: [authGuard]
},

];
