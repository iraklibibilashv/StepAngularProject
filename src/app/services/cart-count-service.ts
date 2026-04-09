import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartCountService {
  private cartCount$ = new BehaviorSubject<number>(0);
  private wishlistCount$ = new BehaviorSubject<number>(0);

  cartCount = this.cartCount$.asObservable();
  wishlistCount = this.wishlistCount$.asObservable();

  setCartCount(count: number) { this.cartCount$.next(count); }
  setWishlistCount(count: number) { this.wishlistCount$.next(count); }

  incrementCart() { this.cartCount$.next(this.cartCount$.value + 1); }
  decrementCart() { this.cartCount$.next(Math.max(0, this.cartCount$.value - 1)); }
  incrementWishlist() { this.wishlistCount$.next(this.wishlistCount$.value + 1); }
  decrementWishlist() { this.wishlistCount$.next(Math.max(0, this.wishlistCount$.value - 1)); }
}
