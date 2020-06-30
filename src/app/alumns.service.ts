import { Injectable } from '@angular/core';
import axios from 'axios';
import { Alumn } from './Interfaces/alumn'

@Injectable({
  providedIn: 'root'
})
export class AlumnsService {

  url = "http://localhost:3000/alumns/"

  constructor() {

  }

  // getAll-Aisha
  getAll(): Promise<Alumn[]> {
    return axios.get(this.url)
      .then(alumn => alumn.data)
      .catch(err => console.log(`Hay un error ${err}`))
  }

  // addOne  - Manu
  addOne(alumn: Alumn): Promise<Alumn> {
    return axios.post(this.url, alumn)
    .then( alumn => alumn.data )
  }

  // delete - Ana
  deleteAlumn(id: string) {
    return axios.delete(`${this.url}/${id}`);
  }

  // update
  updateAlumn(id: string, alumno: Alumn) {
    return axios.put(`${this.url}/${id}`, alumno)
      .then(response => console.log(response))
      .catch(err => {
        console.log(`Algo salio mal ${err}`)
      })
  }

  /*constructor(private route : ActivatedRoute) {
  const id : string = this.route.snapshot.paramMap.get('id');
  //Usamos esta id para poder hacer peticiones y 
  //pedir el resto de información del usuario.
}*/

  /* 
    Recoge un alumno por id 
    @param string Id de un alumno
  */
  getAlumnByID = (id: string): Promise<Alumn> => axios.get(`${this.url}/${id}`).then(alumn => alumn.data).catch(err => console.log('isma la cago en el by id '));

}
