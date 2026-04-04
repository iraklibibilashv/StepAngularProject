import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor( private  api : HttpClient){}
    
    private baseUrl = "https://shopapi.stepacademy.ge/api/products?Take=40&Page=1"
    private authKey = "626ba912-8cbd-4aa8-ae8a-1cbd4832f5cb"

  getProducts() {
    const headers = new HttpHeaders({
      'X-Api-Key': `${this.authKey}`
    });
    return this.api.get(this.baseUrl, { headers });
  }
}

