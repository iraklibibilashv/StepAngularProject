import { Component, OnDestroy, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone : true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  constructor( private api : Api) {
    
  }

  private currentSlide = 0;
  private slides!: NodeListOf<Element>;
  private dots!: NodeListOf<Element>;
  private interval: any;

  ngOnInit(): void {
    this.slides = document.querySelectorAll('.hero__slide');
    this.dots = document.querySelectorAll('.hero__dot');
    this.startAutoPlay();
    this.bindArrows();
    this.bindDots();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private startAutoPlay(): void {
    this.interval = setInterval(() => this.goTo(this.currentSlide + 1), 4000);
  }

  private bindArrows(): void {
    document.getElementById('heroPrev')?.addEventListener('click', () => {
      clearInterval(this.interval);
      this.goTo(this.currentSlide - 1);
      this.startAutoPlay();
    });
    document.getElementById('heroNext')?.addEventListener('click', () => {
      clearInterval(this.interval);
      this.goTo(this.currentSlide + 1);
      this.startAutoPlay();
    });
  }

  private bindDots(): void {
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(this.interval);
        this.goTo(i);
        this.startAutoPlay();
      });
    });
  }

  private goTo(index: number): void {
    const total = this.slides.length;
    this.currentSlide = (index + total) % total;

    this.slides.forEach((s, i) => {
      s.classList.toggle('active', i === this.currentSlide);
    });
    this.dots.forEach((d, i) => {
      d.classList.toggle('active', i === this.currentSlide);
    });
  }
}
