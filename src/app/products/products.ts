import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  allProducts: any[] = [];
  brandsArr: any[] = [];
  categoriesArr: any[] = [];
  loading = true;
  selectedCategoryName = 'Categories';

  filters: any = {
    Search: '',
    Brand: null,
    InStock: false,
    SortBy: null,
    CategoryId: null,
    MinRating: null,
    MinPrice: null,
    MaxPrice: null,
    SortDescending: false,
    Take: 40,
    Page: 1,
  };

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.api.getAll('products?Take=100&Page=1').subscribe({
      next: (data: any) => {
        this.brandsArr = [...new Set(data.data.items.map((p: any) => p.brand))];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.cdr.detectChanges();
      },
    });

    this.api.getAll('categories').subscribe({
      next: (data: any) => {
        this.categoriesArr = data.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.cdr.detectChanges();
      },
    });

    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.api.getFilteredProducts(this.filters).subscribe({
      next: (data: any) => {
        this.allProducts = data.data.items;
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
  clearFilters() {
    this.filters = {
      Search: '',
      Brand: null,
      InStock: false,
      SortBy: null,
      CategoryId: null,
      MinRating: null,
      MinPrice: null,
      MaxPrice: null,
      SortDescending: false,
      Take: 40,
      Page: 1,
    };
    this.loadProducts();
  }

  onSearch(value: string) {
    this.filters.Search = value;
    this.loadProducts();
  }
  selectBrand(brand: string | null) {
    this.filters.Brand = brand;
    this.loadProducts();
  }
  onInStock(value: boolean) {
    this.filters.InStock = value;
    this.loadProducts();
  }
  onSortBy(value: string) {
    if (value === 'price_asc') {
      this.filters.SortBy = 'price';
      this.filters.SortDescending = false;
    } else if (value === 'price_desc') {
      this.filters.SortBy = 'price';
      this.filters.SortDescending = true;
    } else if (value === 'name_asc') {
      this.filters.SortBy = 'name';
      this.filters.SortDescending = false;
    } else if (value === 'name_desc') {
      this.filters.SortBy = 'name';
      this.filters.SortDescending = true;
    } else if (value === 'rating_desc') {
      this.filters.SortBy = 'rating';
      this.filters.SortDescending = true;
    } else if (value === `nulldefault`) {
      this.filters.SortBy = null;
      this.filters.SortDescending = false;
    } else {
      this.filters.SortBy = 'name_desc';
      this.filters.SortDescending = false;
    }
    this.loadProducts();
  }
  selectCategory(id: number | null, name: string = 'Categories') {
    this.filters.CategoryId = id;
    this.selectedCategoryName = name;
    this.loadProducts();
  }
  onMinRating(value: number) {
    this.filters.MinRating = value;
    this.loadProducts();
  }
  onSortDescending(value: boolean) {
    this.filters.SortDescending = value;
    this.loadProducts();
  }
  onMinPrice(value: number) {
    this.filters.MinPrice = value;
    this.loadProducts();
  }
  onMaxPrice(value: number) {
    this.filters.MaxPrice = value;
    this.loadProducts();
  }
}

// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Api } from '../services/api';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-products',
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './products.html',
//   styleUrl: './products.scss',
// })
// export class Products implements OnInit {
//   productArr: any[] = [];
//   allProducts: any[] = [];
//   filterCategory: any[] = [];
//   brandsArr: any[] = [];
//   categoriesArr: any[] = [];
//   loading = true;
//   searchQuery = '';
//   price = 0;
//   currentCategoryId: any = 'All';
//   currentPriceRange = { min: null as number | null, max: null as number | null };

//   filters: any = {
//     Search: '',
//     Brand: null,
//     inStock: false,
//     SortBy: null,
//     CategoryId: null,
//     MinRating: null,
//     MinPrice: null,
//     MaxPrice: null,
//     SortDescending: false,
//     Take: 40,
//     Page: 1,
//   };

//   constructor(
//     private api: Api,
//     private cdr: ChangeDetectorRef,
//   ) {}
//   ngOnInit() {
//     this.api.getAll('products?Take=40&Page=1').subscribe({
//       next: (data: any) => {
//         this.productArr = data.data.items;
//         this.filterCategory = data.data.items;
//         console.log(this.productArr);

//         this.brandsArr = [...new Set(this.productArr.map((p: any) => p.brand))];
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         console.error(err);
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//     });
//   this.api.getAll('products?Take=100&Page=1').subscribe({
//     next: (data: any) => {
//       this.brandsArr = [...new Set(data.data.items.map((p: any) => p.brand))];
//     },
//     error: (err) => console.error(err)
//   });

//     this.api.getAll('categories').subscribe({
//       next: (data: any) => {
//         this.categoriesArr = data.data;
//       },
//       error: (err) => console.error(err),
//     });
//     this.loadProducts();
//   }

//   loadProducts() {
//     this.api.getFilteredProducts(this.filters).subscribe({
//       next: (data: any) => {
//         this.allProducts = data.data.items;
//         this.loading = false;
//         this.cdr.detectChanges();
//         console.log(this.allProducts);
//       },
//       error: (err) => {
//         console.error(err);
//         this.loading = false;
//         this.cdr.detectChanges();
//       },

//     });
//   }
//   onSearch(value: string) {
//     this.filters.Search = value;
//     this.loadProducts();
//   }
//   selectBrand(brand: string | null) {
//     this.filters.Brand = brand;
//     this.loadProducts();
//   }
//   onInStock(value: boolean) {
//     this.filters.InStock = value;
//     this.loadProducts();
//   }
//   onSortBy(value: string) {
//     this.filters.SortBy = value;
//     this.loadProducts();
//   }
//   selectCategory(id: number | null) {
//     this.filters.CategoryId = id;
//     this.loadProducts();
//   }
//   onMinRating(value: number) {
//     this.filters.MinRating = value;
//     this.loadProducts();
//   }
//   onSortDescending(value: boolean) {
//     this.filters.SortDescending = value;
//     this.loadProducts();
//   }
//   onMinPrice(value: number) {
//     this.filters.MinPrice = value;
//     this.loadProducts();
//   }
//   onMaxPrice(value: number) {
//     this.filters.MaxPrice = value;
//     this.loadProducts();
//   }
//   onTake(value: number) {
//     this.filters.Take = 40;
//     this.loadProducts();
//   }
//   onPage(value: number) {
//     this.filters.Page = 1;
//     this.loadProducts();
//   }
// }
