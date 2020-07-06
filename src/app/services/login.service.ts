import { Injectable } from '@angular/core';
import axios from 'axios';
import { Session } from '../Interfaces/session';
import { Alumn } from '../Interfaces/alumn'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:3000/"
  constructor() { }

  async validateUser (data : Session) : Promise<Alumn[]> {
    return axios.get(`${this.url}alumns?loginEmail=${data.email}`)
      .then(response => response.data)
      .catch( err => console.log(`No nos valida el usuario ${err}`))
  }
  async validateAdmin (data : Session) : Promise<Alumn[]> {
    return axios.get(`${this.url}administrators?email=${data.email}`)
      .then(response => response.data)
      .catch( err => console.log(`No nos valida el administrador ${err}`))
  }

}
