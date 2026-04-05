import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products  implements OnInit{
  productArr: any[] = [];
  loading = true

  constructor(private api: Api ,  private cdr: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.api.getProducts("products?Take=40&Page=1").subscribe({
      next: (data: any) => {
        this.productArr = data.data.items;
        console.log(this.productArr);
        this.loading = false;
        this.cdr.detectChanges(); 
        
      },
      error: (err) => {
        console.error(err);
        this.loading = false 
        this.cdr.detectChanges(); 
      }
    });
  }
}
