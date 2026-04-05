import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private categorySource = new BehaviorSubject<any>('All');
  selectedCategory$ = this.categorySource.asObservable();
  private priceSource = new BehaviorSubject<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  selectedPrice$ = this.priceSource.asObservable();

  setCategory(id: any) {
    this.categorySource.next(id);
  }
  setPriceRange(min : number | null, max : number | null) {
    this.priceSource.next({ min, max });
  }

}
