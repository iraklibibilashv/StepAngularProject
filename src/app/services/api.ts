import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor( private  api : HttpClient){}
    
    private productGetAllUrl = "https://shopapi.stepacademy.ge/api/products?Take=40&Page=1"
    private categoryGetAllUrl = "https://shopapi.stepacademy.ge/api/categories"
    private authKey = "a083ac06-16f1-445e-8574-90c2eb0e764f"

  getProducts() {
    const headers = new HttpHeaders({
      'X-Api-Key': `${this.authKey}`
    });
    return this.api.get(this.productGetAllUrl, { headers });
  }
  getCategories(){
    const headers = new HttpHeaders({
      'X-Api-Key': `${this.authKey}`
    });
    return this.api.get(this.categoryGetAllUrl, { headers })
  }
}

