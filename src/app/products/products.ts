import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toast } from '../toast/toast';
import { ToastService } from '../services/toast';
import { AuthService } from '../services/auth-service';

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
  favoriteIds: number[] = [];

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: ActivatedRoute,
    private route: Router,
    private toast: ToastService,
    private auth : AuthService
  ) {
    this.router.queryParams.subscribe((data: any) => {
      if (data.id && data.name) {
        this.filters.CategoryId = data.id;
        this.selectedCategoryName = data.name;
      }
    });
    this.router.queryParams.subscribe((data: any) => {
      if (data.brand) {
        this.filters.Brand = data.brand;
      }
    });
  }
  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }


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
    this.loadFavorites();
  }

  loadProducts() {
    this.loading = true;
    this.api.getFilteredProducts(this.filters).subscribe({
      next: (data: any) => {
        this.allProducts = data.data.items;
        console.log(this.allProducts);

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
  addToCart(productId: number) {
    this.api.addToCart(productId, 1).subscribe({
      next: (data: any) => {
        this.toast.show('Added to cart', 'success');
        console.log('Added to cart', data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  goToDetails(id: number) {
    this.route.navigate(['/details', id]);
  }

loadFavorites() {
  if (!this.auth.isLoggedIn()) return;
  this.api.getFavorites().subscribe({
    next: (data: any) => {
      this.favoriteIds = data.data.items.map((item: any) => item.id);
      console.log('favoriteIds:', this.favoriteIds);
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}
  
addToWishlist(productId: number) {
  if (this.favoriteIds.includes(productId)) {
    this.api.removeFromFavorites(productId).subscribe({
      next: () => {
        this.toast.show('Removed from wishlist!', 'warning');
        this.favoriteIds = this.favoriteIds.filter(id => id !== productId);
        this.cdr.detectChanges();
      },
      error: () => this.toast.show('Failed to remove.', 'error')
    });
  } else {
    this.api.addToFavorites(productId).subscribe({
      next: () => {
        this.toast.show('Added to wishlist!', 'success');
        this.favoriteIds = [...this.favoriteIds, productId];
        this.cdr.detectChanges();
      },
      error: () => this.toast.show('Failed to add.', 'error')
    });
  }
}
}
