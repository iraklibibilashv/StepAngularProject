import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor( private  api : HttpClient){}
    

    private baseUrl = "https://shopapi.stepacademy.ge/api/"
    private authKey = "6e0445ab-3680-46e9-b7d3-6a8e339175c4"
    getHeaders() {
  return new HttpHeaders({
    'X-API-KEY': this.authKey
  });
}

  getAll(url : string) {
    return this.api.get(this.baseUrl + url, { 
      headers : this.getHeaders()});
  }


  getFilteredProducts(filters : any){
    let params = new HttpParams();
    if (filters.search) {
      params = params.set('Search', filters.search);
    }
    if (filters.categoryId) {
      params = params.set('CategoryId', filters.categoryId);
    }
    if (filters.minPrice) {
      params = params.set('MinPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      params = params.set('MaxPrice', filters.maxPrice);
    }
    return this.api.get(this.baseUrl + `products/filter`,
      {
        headers: this.getHeaders(),
        params: params
      }
    )
  }
}

