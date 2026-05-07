import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartCountService {
  cartCount = signal(0);
  wishlistCount = signal(0);

  setCartCount(count: number) { this.cartCount.set(count); }
  setWishlistCount(count: number) { this.wishlistCount.set(count); }

  incrementCart() { this.cartCount.update(v => v + 1); }
  decrementCart() { this.cartCount.update(v => Math.max(0, v - 1)); }
  incrementWishlist() { this.wishlistCount.update(v => v + 1); }
  decrementWishlist() { this.wishlistCount.update(v => Math.max(0, v - 1)); }
}
