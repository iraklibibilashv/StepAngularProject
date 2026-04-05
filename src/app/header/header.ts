import { Component } from '@angular/core';
import { Api } from '../services/api';
import { RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule,FormsModule,RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
   constructor ( 
    private api : Api,
   private filterService : FilterService){
    
  } 
  ngOnInit(){
        this.api.getCategories("categories").subscribe({
      next: (data: any) => {
        this.categoriesArr = data.data
        console.log(this.categoriesArr);
      },
      error: (err) => console.error(err)
    });
        this.api.getProducts("products?Take=40&Page=1").subscribe({
      next: (data: any) => {
        this.allProduct = data.data.items
        this.filterBrandsArr = data.data.items;
        this.brandsArr = [...new Set(this.filterBrandsArr.map((p: any) => p.brand))];
        console.log(this.brandsArr);
      },
      error: (err) => console.error(err)
    });
  }
  menuOpen = false;
searchQuery = '';
filters = {
  rating: null as number | null,
  priceMin: null,
  priceMax: null,
  inStock: false,
  sortBy: ''
};
wishlistCount = 0;
cartCount = 0;
onCategoryClick(id : any) {
  console.log("category clicked", id);
  
  this.filterService.setCategory(id);
}
onSearchChange(): void {}
onFilterChange(): void {
  this.filterService.setPriceRange(this.filters.priceMin, this.filters.priceMax);
}
clearFilters(): void {
  this.filters = { rating: null, priceMin: null, priceMax: null, inStock: false, sortBy: '' };
  this.searchQuery = '';
  this.filterService.setCategory('All');
  this.filterService.setPriceRange(null, null);
}
  pageIndex = 1
  pageSize = 38
  allProduct : any [] = []
   filterBrandsArr : any[] = []
  categoriesArr : any = []
  filterCategory : any = []
  brandsArr : any = []
  productArr : any = []
}
