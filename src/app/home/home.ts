import { Component } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor( private api : Api) {
    
  }
}
