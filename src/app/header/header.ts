import { Component } from '@angular/core';
import { Api } from '../services/api';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
   constructor ( private api : Api){
    
  }
  ngOnInit(){
    

  }
  pageIndex = 1
  pageSize = 38

  categoriesArr : any = []
  brandsArr : any = []
  productArr : any = []
}
