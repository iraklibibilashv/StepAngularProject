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

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private toastService : ToastService,
    private cartCountService: CartCountService
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
      error: (err) => console.error(err)
    });
  }

  editQuantity(itemId: number, quantity: number) {
    if (quantity < 1) return;
    this.api.editQuantity(itemId, quantity).subscribe({
      next: () =>{ this.loadCart(),
        this.cdr.detectChanges()
      },
      error: (err) => console.error(err)
    });
  }
  get total(): number {
  return this.cartArr.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
   onCheckout() {
  this.api.checkout().subscribe({
    next: () => {
      this.toastService.show('Order placed!', 'success');
      this.loadCart();
    },
    error: () => this.toastService.show('Checkout failed.', 'error')
  });
}
clearCart() {
  const deleteAll = this.cartArr.map((item: any) => 
    this.api.removeFromCart(item.id).toPromise()
  );
  Promise.all(deleteAll).then(() => {
    this.cartArr = [];
    this.toastService.show('Cart cleared!', 'warning');
    this.cdr.detectChanges();
  }).catch(() => {
    this.toastService.show('Failed to clear cart.', 'error');
  });
}

}
