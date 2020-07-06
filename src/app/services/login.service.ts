import { Injectable } from '@angular/core';
import axios from 'axios';
import { Session } from '../Interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:3000/"
  constructor() { }

  validateUser (session : Session ){

    return axios.get(`${this.url}alumns?loginEmail= &&password=`)
      .then(response => response.data)
      .catch( err => console.log(`No nos valida el usuario ${err}`))
  }
}
