import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AuthService } from '../services/auth-service';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-myaccount',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './myaccount.html',
  styleUrl: './myaccount.scss',
})
export class Myaccount {
  user: any = null;
  loading = true;
  activeTab = 'profile';
  editMode = false;
  editData: any = {};
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  showDeleteConfirm = false;
  editingProduct: any = null;
  editingCategory: any = null;

  constructor(
    private api: Api,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadUser();
    if (this.isAdmin) this.loadAllProducts();
  }

  loadUser() {
    this.api.getMe().subscribe({
      next: (data: any) => {
        this.user = data.data;
        this.editData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.details?.phoneNumber || '',
          address: this.user.details?.address || '',
          pictureUrl: this.user.details?.pictureUrl || '',
          dateOfBirth: this.user.details?.dob || null,
        };
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

  saveProfile() {
    const data = {
      ...this.editData,
      address: this.editData.address || null,
      phoneNumber: this.editData.phoneNumber || null,
      pictureUrl: this.editData.pictureUrl || null,
      dateOfBirth: this.editData.dateOfBirth || null,
    };
    this.api.updateUser(data).subscribe({
      next: () => {
        this.toastService.show('Profile updated!', 'success');
        this.editMode = false;
        this.loadUser();
      },
      error: () => this.toastService.show('Failed to update profile.', 'error'),
    });
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.toastService.show('Passwords do not match!', 'error');
      return;
    }
    this.api
      .changePassword(this.passwordData.currentPassword, this.passwordData.newPassword)
      .subscribe({
        next: () => {
          this.toastService.show('Password changed!', 'success');
          this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
          this.cdr.detectChanges();
        },
        error: () => this.toastService.show('Failed to change password.', 'error'),
      });
  }

  deleteProfile() {
    this.api.deleteProfile().subscribe({
      next: () => {
        this.auth.logout();
        this.toastService.show('Account deleted.', 'warning');
        this.router.navigate(['/login']);
      },
      error: () => this.toastService.show('Failed to delete account.', 'error'),
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
  }
  newProduct: any = {
    name: '',
    description: '',
    brand: '',
    model: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    imageUrl: '',
  };

  newCategory: any = {
    name: '',
    description: '',
    imageUrl: '',
  };

  addProduct() {
    this.api.addProduct(this.newProduct).subscribe({
      next: () => {
        this.toastService.show('Product added!', 'success');
        this.resetProductForm();
      },
      error: () => this.toastService.show('Failed to add product.', 'error'),
    });
  }

  addCategory() {
    this.api.addCategory(this.newCategory).subscribe({
      next: () => {
        this.toastService.show('Category added!', 'success');
        this.resetCategoryForm();
      },
      error: () => this.toastService.show('Failed to add category.', 'error'),
    });
  }

  resetProductForm() {
    this.newProduct = {
      name: '',
      description: '',
      brand: '',
      model: '',
      price: 0,
      stock: 0,
      categoryId: 0,
      imageUrl: '',
    };
  }

  resetCategoryForm() {
    this.newCategory = { name: '', description: '', imageUrl: '' };
  }

  get isAdmin() {
    return this.auth.isAdmin();
  }
  allProducts: any[] = [];

  loadAllProducts() {
    this.api.getAll('products?Take=100&Page=1').subscribe({
      next: (data: any) => {
        this.allProducts = data.data.items;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  deleteProduct(productId: number) {
    this.api.deleteProduct(productId).subscribe({
      next: () => {
        this.toastService.show('Product deleted!', 'warning');
        this.allProducts = this.allProducts.filter((p) => p.id !== productId);
        this.cdr.detectChanges();
      },
      error: () => this.toastService.show('Failed to delete product.', 'error'),
    });
  }
  allCategories: any[] = [];

  loadAllCategories() {
    this.api.getAll('categories').subscribe({
      next: (data: any) => {
        this.allCategories = data.data;
        this.cdr.detectChanges();
        console.log('categories', this.allCategories);
      },
      error: (err) => console.error(err),
    });
  }

  deleteCategory(categoryId: number) {
    this.api.deleteCategory(categoryId).subscribe({
      next: () => {
        this.toastService.show('Category deleted!', 'warning');
        this.allCategories = this.allCategories.filter((c) => c.id !== categoryId);
        this.cdr.detectChanges();
      },
      error: () => this.toastService.show('Failed to delete category.', 'error'),
    });
  }
  startEditProduct(product: any) {
    this.editingProduct = { ...product };
  }

  saveEditProduct() {
    this.api.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
      next: () => {
        this.toastService.show('Product updated!', 'success');
        this.editingProduct = null;
        this.loadAllProducts();
      },
      error: () => this.toastService.show('Failed to update.', 'error'),
    });
  }

  startEditCategory(cat: any) {
    this.editingCategory = { ...cat };
  }

  saveEditCategory() {
    this.api.updateCategory(this.editingCategory.id, this.editingCategory).subscribe({
      next: () => {
        this.toastService.show('Category updated!', 'success');
        this.editingCategory = null;
        this.loadAllCategories();
      },
      error: () => this.toastService.show('Failed to update.', 'error'),
    });
  }
}
