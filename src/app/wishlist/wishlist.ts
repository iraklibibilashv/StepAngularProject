import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
 wishlistArr: any[] = [];
  loading = true;
 
  constructor(
    private api: Api,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}
 
  ngOnInit() {
    this.loadWishlist();
  }
 
  loadWishlist() {
    this.loading = true;
    this.api.getFavorites().subscribe({
      next: (data: any) => {
        this.wishlistArr = data.data.items;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
 
removeFromWishlist(itemId: number) {
  this.api.removeFromFavorites(itemId).subscribe({
    next: () => {
      this.toastService.show('Removed from wishlist!', 'warning');
      this.wishlistArr = this.wishlistArr.filter(item => item.id !== itemId);
      this.cdr.detectChanges();
    },
    error: () => this.toastService.show('Failed to remove.', 'error'),
  });
}
 
  addToCart(productId: number) {
    this.api.addToCart(productId, 1).subscribe({
      next: () => this.toastService.show('Added to cart!', 'success'),
      error: () => this.toastService.show('Failed to add to cart.', 'error'),
    });
  }
  clearAll() {
  const deleteAll = this.wishlistArr.map((item: any) => 
    this.api.removeFromFavorites(item.id).toPromise()
  );
  Promise.all(deleteAll).then(() => {
    this.wishlistArr = [];
    this.toastService.show('Wishlist cleared!', 'warning');
    this.cdr.detectChanges();
  }).catch(() => {
    this.toastService.show('Failed to clear wishlist.', 'error');
  });
}
}
