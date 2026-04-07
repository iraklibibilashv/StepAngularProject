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
  searchQuery = '';
  price = 0;
  currentCategoryId: any = 'All';
  currentPriceRange = { min: null as number | null, max: null as number | null };


  
  filters = {
  rating: null as number | null,
  priceMin: null,
  priceMax: null,
  inStock: false,
  sortBy: ''
};
onFilterChange(): void {
  this.filterService.setPriceRange(this.filters.priceMin, this.filters.priceMax);
}
clearFilters(): void {
  this.filters = { rating: null, priceMin: null, priceMax: null, inStock: false, sortBy: '' };
  this.searchQuery = '';
  this.filterService.setCategory('All');
  this.filterService.setPriceRange(null, null);
}

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
}
