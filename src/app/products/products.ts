import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products  implements OnInit{
  productArr: any[] = [];

  constructor(private api: Api) {

  }
  ngOnInit() {
    this.api.getProducts().subscribe({
      next: (data: any) => {
        this.productArr = data.data.items;
        console.log(this.productArr);
      },
      error: (err) => console.error(err)
    });
  }

}
