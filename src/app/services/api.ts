import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api: HttpClient) {}

  private baseUrl = 'https://shopapi.stepacademy.ge/api/';
  private authKey = '6e0445ab-3680-46e9-b7d3-6a8e339175c4';
  getHeaders() {
    return new HttpHeaders({
      'X-API-KEY': this.authKey,
    });
  }

  postRegister(userData: any) {
    return this.api.post(this.baseUrl + 'auth/register', userData, {
      headers: this.getHeaders(),
    });
  }
  postLogin(userData: any) {
    return this.api.post(this.baseUrl + 'auth/login', userData, {
      headers: this.getHeaders(),
    });
  }
  postForgotPassword(email: any) {
    return this.api.post(
      this.baseUrl + 'auth/forgot-password',
      { email },
      {
        headers: this.getHeaders(),
      },
    );
  }
  putVerify(email: any, code: any) {
    return this.api.put(
      this.baseUrl + 'auth/verify-email',
      { email, code },
      {
        headers: this.getHeaders(),
      },
    );
  }

  getAll(url: string) {
    return this.api.get(this.baseUrl + url, {
      headers: this.getHeaders(),
    });
  }

  getFilteredProducts(filters: any) {
    let params = new HttpParams();

    if (filters.Search) params = params.set('Search', filters.Search);
    if (filters.Brand) params = params.set('Brand', filters.Brand);
    if (filters.InStock) params = params.set('InStock', filters.InStock);
    if (filters.SortBy) params = params.set('SortBy', filters.SortBy);
    if (filters.CategoryId != null) params = params.set('CategoryId', filters.CategoryId);
    if (filters.MinRating) params = params.set('MinRating', filters.MinRating);
    if (filters.SortDescending) params = params.set('SortDescending', filters.SortDescending);
    if (filters.MinPrice) params = params.set('MinPrice', filters.MinPrice);
    if (filters.MaxPrice) params = params.set('MaxPrice', filters.MaxPrice);
    if (filters.Take) params = params.set('Take', filters.Take);
    if (filters.Page) params = params.set('Page', filters.Page);

    return this.api.get(this.baseUrl + 'products/filter', {
      headers: this.getHeaders(),
      params: params,
    });
  }
}
