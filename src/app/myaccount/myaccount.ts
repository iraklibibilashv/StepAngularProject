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

  constructor(
    private api: Api,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadUser();
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
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('token')
    
  }
}
