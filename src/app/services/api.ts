import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor( private  api : HttpClient){}
    

    private baseUrl = "https://shopapi.stepacademy.ge/api/"
    private authKey = "a3e05c86-9152-467a-a8d4-4af7d4490213"
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

