import { Component } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  constructor(private api : Api){

  } 
  ngOnInit(){
    this.api.getAll("cart?Take=30&Page=1").subscribe({
      next : (data : any) => {
        this.cartArr = data
        console.log(this.cartArr);
      },
      error : (err) => {
        console.error(err);
      }
    })
  }

  cartArr : any[] = []
}
