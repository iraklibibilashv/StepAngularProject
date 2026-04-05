import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor( private  api : HttpClient){}
    

    private baseUrl = "https://shopapi.stepacademy.ge/api/"
    private authKey = "aff2cecc-08c5-4e48-9f8d-fb4524c91b7b"
    getHeaders() {
  return new HttpHeaders({
    'X-API-KEY': this.authKey
  });
}

  getProducts(url : string) {
    return this.api.get(this.baseUrl + url, { 
      headers : this.getHeaders()});
  }
  getCategories(url : string){
    return this.api.get(this.baseUrl + url, {
       headers : this.getHeaders()})
  }
  getCart(url : string) {
    return this.api.get(this.baseUrl + url, {
       headers : this.getHeaders()})
  }
}

