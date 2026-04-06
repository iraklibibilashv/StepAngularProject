import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter-service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  productArr: any[] = [];
  filterCategory: any[] = [];
  brandsArr: any[] = [];
  categoriesArr: any[] = [];
  loading = true;
  price = 0;
  currentCategoryId: any = 'All';
  currentPriceRange = { min: null as number | null, max: null as number | null };

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private filterService: FilterService,
  ) {}
  ngOnInit() {
    this.api.getAll('products?Take=40&Page=1').subscribe({
      next: (data: any) => {
        this.productArr = data.data.items;
        this.filterCategory = data.data.items;
         this.brandsArr = [...new Set(this.productArr.map((p: any) => p.brand))];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    this.api.getAll("categories").subscribe({
      next: (data: any) => {
        this.categoriesArr = data.data
      },
      error: (err) => console.error(err)
    });
  }
//   filterByCategory(id: any) {
//     if (id === 'All') {
//       this.filterCategory = this.productArr;
//     } else if (typeof id === `string`) {
//       this.filterCategory = this.productArr.filter((el: any) => el.brand === id);
//     } else {
//       this.filterCategory = this.productArr.filter((el: any) => el.category.id === id);
//     }
//   }
//   filterByPrice(min: number | null, max: number | null) {
//     this.filterCategory = this.productArr.filter((el: any) => {
//       this.price = el.price;
//       const minPrice = min === null || this.price >= min;
//       const maxPrice = max === null || this.price <= max;
//       return minPrice && maxPrice;
//     });
//   }
//  combinedFilter() {
//   console.log('ფილტრაცია დაიწყო. კატეგორია:', this.currentCategoryId);
  
//   this.filterCategory = this.productArr.filter((el: any) => {
    
//     // 1. კატეგორიის/ბრენდის შემოწმება
//     let catMatch = true;
//     if (this.currentCategoryId && this.currentCategoryId !== 'All') {
      
//       // ვამოწმებთ ბრენდს (თუ ტექსტია)
//       const isBrand = typeof this.currentCategoryId === 'string' && isNaN(Number(this.currentCategoryId));

//       if (isBrand) {
//         // ბრენდის შედარება (უსაფრთხოდ)
//         catMatch = el.brand?.toString().toLowerCase().includes(this.currentCategoryId.toLowerCase());
//       } else {
//         // კატეგორიის შედარება (ვამოწმებთ el.category.id-საც და el.categoryId-საც)
//         const prodCatId = el.category?.id || el.categoryId; 
//         catMatch = prodCatId?.toString() === this.currentCategoryId.toString();
//       }
//     }

//     // 2. ფასის შემოწმება (რადგან გიმუშავებს, უცვლელია)
//     const price = el.price;
//     const minMatch = this.currentPriceRange.min === null || price >= this.currentPriceRange.min;
//     const maxMatch = this.currentPriceRange.max === null || price <= this.currentPriceRange.max;

//     return catMatch && minMatch && maxMatch;
//   });

//   console.log('გაფილტრული პროდუქტების რაოდენობა:', this.filterCategory.length);
//   this.cdr.detectChanges();
// }
}
