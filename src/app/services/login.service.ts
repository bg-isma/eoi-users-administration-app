import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:3000/"
  constructor() { }

  getLoginEmail (){

  }
}
