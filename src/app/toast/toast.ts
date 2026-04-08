import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  imports: [CommonModule,FormsModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast{
}
