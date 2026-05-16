import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toast } from '../toast/toast';
import { ToastService } from '../services/toast';
import { CartCountService } from '../services/cart-count-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartArr: any[] = [];
  loading = true;
  showSurveyModal = false;
  surveyUrl = "https://iraklibib99.app.n8n.cloud/form/7a4f8326-26e0-45ac-a5d9-1126fbc22f61"

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private cartCountService: CartCountService,
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.api.getAll('cart?Take=30&Page=1').subscribe({
      next: (data: any) => {
        this.cartArr = data.data.items;
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

  removeFromCart(productId: number) {
    this.api.removeFromCart(productId).subscribe({
      next: () => {
        this.cartCountService.decrementCart();
        this.loadCart();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  editQuantity(itemId: number, quantity: number) {
    if (quantity < 1) return;
    this.api.editQuantity(itemId, quantity).subscribe({
      next: () => {
        (this.loadCart(), this.cdr.detectChanges());
      },
      error: (err) => console.error(err),
    });
  }
  get total(): number {
    return this.cartArr.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
  onCheckout() {
  this.api.checkout().subscribe({
    next: () => {
      this.toastService.show('Order placed!', 'success');
      const data = {
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        totalPrice: this.total,
        date: new Date().toLocaleDateString('ka-GE'),
        items: this.cartArr.map((item: any) => ({
          name: item.product.name,
          brand: item.product.brand,
          quantity: item.quantity,
          price: (item.product.price * item.quantity).toFixed(2),
          imageUrl: item.product.imageUrl
        }))
      };
      this.api.sendEmail(data).subscribe({
        next: () => console.log(data),
        error: (err) => console.error('n8n error:', err)
      });
      this.showSurveyModal = true
      this.cdr.detectChanges()
      this.loadCart();
    },
    error: () => this.toastService.show('Checkout failed.', 'error'),
  });
}
  clearCart() {
    const deleteAll = this.cartArr.map((item: any) => this.api.removeFromCart(item.id).toPromise());
    Promise.all(deleteAll)
      .then(() => {
        this.cartArr = [];
        this.toastService.show('Cart cleared!', 'warning');
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.toastService.show('Failed to clear cart.', 'error');
      });
  }
  openSurvey() {
  this.showSurveyModal = false;
  window.open(this.surveyUrl, '_blank');
}
}
