import { Routes } from '@angular/router';

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
},
{
  path: 'login',
  loadComponent: () => import('./login/login').then(m => m.Login),
},
{
  path: 'register',
  loadComponent: () => import('./register/register').then(m => m.Register),
}

];
