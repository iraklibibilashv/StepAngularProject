import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-toast',
  imports: [CommonModule,FormsModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast{
toasts$;
  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts;
  }
  remove(id: number) { this.toastService.remove(id); }
}
