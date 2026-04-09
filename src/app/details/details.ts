import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { ToastService } from '../services/toast';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-details',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
 product: any = null;
  loading = true;
  quantity = 1;
  addedToCart = false;
  reviews: any[] = [];
userReview: any = null;
selectedRate = 0;
hoverRate = 0;
 
  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private auth: AuthService
  ) {}
 
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(`product id:`, id);
    
    this.api.getProductById(+id!).subscribe({
      next: (data: any) => {
        this.product = data.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    this.loadReviews();
  }
  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }
 
  increaseQty() {
    this.quantity++;
  }
 
  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }
 
  addToCart() {
    this.api.addToCart(this.product.id, this.quantity).subscribe({
      next: () => {
        this.addedToCart = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.addedToCart = false;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (err) => console.error(err),
    });
  }
  loadReviews() {
  const id = this.route.snapshot.paramMap.get('id');
  this.api.getReviews(+id!).subscribe({
    next: (data: any) => {
      this.reviews = data.data.items;
      this.userReview = this.reviews.find((r: any) => r.isOwner);
      console.log('reviews:', this.reviews);
      if (this.userReview) this.selectedRate = this.userReview.rating;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}
setRate(rate: number) {
  this.selectedRate = rate;
}

submitReview() {
  if (this.userReview) {
    this.api.updateReview(this.userReview.id, this.selectedRate).subscribe({
      next: () => {
        this.toastService.show('Review updated!', 'success');
        this.loadReviews();
      },
      error: () => this.toastService.show('Failed to update review.', 'error')
    });
  } else {
    this.api.addReview(this.product.id, this.selectedRate).subscribe({
      next: () => {
        this.toastService.show('Review added!', 'success');
        this.loadReviews();
      },
      error: () => this.toastService.show('Failed to add review.', 'error')
    });
  }
}

deleteReview() {
  this.api.deleteReview(this.product.id).subscribe({
    next: () => {
      this.toastService.show('Review deleted!', 'warning');
      this.userReview = null;
      this.selectedRate = 0;
      this.loadReviews();
    },
    error: () => this.toastService.show('Failed to delete review.', 'error')
  });
}
}
