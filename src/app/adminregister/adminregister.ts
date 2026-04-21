import { Component } from '@angular/core';
import { Api } from '../services/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminregister',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adminregister.html',
  styleUrl: './adminregister.scss',
})
export class Adminregister {
  constructor(
    private api: Api,
    private router: Router,
  ) {}
  user = {
    login: '',
    password: '',
  };

  onRegister() {
    this.api.postAdminRegister(this.user).subscribe({
      next: (data: any) => {
      },
      error: (err) => console.error(err),
    });
  }
}
