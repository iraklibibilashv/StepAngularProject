import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

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
 
  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
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
}
