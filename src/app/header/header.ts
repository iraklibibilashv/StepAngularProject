import { Component } from '@angular/core';
import { Api } from '../services/api';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private api: Api) {}
  ngOnInit() {
    this.api.getAll('categories').subscribe({
      next: (data: any) => {
        this.categoriesArr = data.data;
        console.log(this.categoriesArr);
      },
      error: (err) => console.error(err),
    });
    this.api.getAll('products?Take=40&Page=1').subscribe({
      next: (data: any) => {
        this.allProduct = data.data.items;
        this.filterBrandsArr = data.data.items;
        this.brandsArr = [...new Set(this.filterBrandsArr.map((p: any) => p.brand))];
        console.log(this.brandsArr);
      },
      error: (err) => console.error(err),
    });
  }
  // xayipat339@kobace.com
  // Ii123@123

  menuOpen = false;
  searchQuery = '';
  filters = {
    rating: null as number | null,
    priceMin: null,
    priceMax: null,
    inStock: false,
    sortBy: '',
  };
  wishlistCount = 0;
  cartCount = 0;
  onCategoryClick(id: any) {
    console.log('category clicked', id);
  }
  onSearchChange(): void {}
  onFilterChange(): void {}
  clearFilters(): void {
    this.filters = { rating: null, priceMin: null, priceMax: null, inStock: false, sortBy: '' };
    this.searchQuery = '';
  }
  pageIndex = 1;
  pageSize = 38;
  allProduct: any[] = [];
  filterBrandsArr: any[] = [];
  categoriesArr: any = [];
  filterCategory: any = [];
  brandsArr: any = [];
  productArr: any = [];
}
