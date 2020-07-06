import { Injectable } from '@angular/core';
import axios from 'axios';
import { Alumn } from './Interfaces/alumn'
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AlumnsService {

  url = "http://localhost:3000/alumns"

  constructor(private storage: AngularFireStorage) {

  }

  // getAll-Aisha
  getAll(page: number): Promise<Alumn[]> {
    return axios.get(`${this.url}?_page=${page}&_limit=20`)
      .then(alumn => alumn.data)
      .catch(err => console.log(`Hay un error ${err}`))
  }

  getAllByCourse(text: string, page: number): Promise<Alumn[]> {
    return axios.get(`${this.url}?mainCourse_like=${text}&_page=${page}&_limit=20`)
      .then(alumn => alumn.data)
      .catch(err => console.log(`Hay un error ${err}`))
  }

  getAllByLocation(text: string, page: number): Promise<Alumn[]> {
    return axios.get(`${this.url}?city_like=${text}&_page=${page}&_limit=20`)
      .then(alumn => alumn.data)
      .catch(err => console.log(`Hay un error ${err}`))
  }

  getAllByLaborSituation(text: string, page: number): Promise<Alumn[]> {
    return axios.get(`${this.url}?laborSituation_like=${text}&_page=${page}&_limit=20`)
      .then(alumn => alumn.data)
      .catch(err => console.log(`Hay un error ${err}`))
  }

  getAllByName(text: string, page: number): Promise<Alumn[]> {
    return axios.get(`${this.url}?name_like=${text}&_page=${page}&_limit=20`)
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

  /* 
    Recoge un alumno por id 
    @param string Id de un alumno
  */
  getAlumnByID = (id: string): Promise<Alumn> => axios.get(`${this.url}/${id}`).then(alumn => alumn.data).catch(err => console.log('isma la cago en el by id '));

  isRepeatedAlumn(email:string) : Promise<Alumn[]> {
    return axios.get(`${this.url}?loginEmail=${email}`)
      .then(response => response.data)
      .catch( err => console.log(`Algo salio mal ${err}`))

  }

  uploadUserPhoto(file: File, id:string ) {
    this.storage.upload(`upload/${id}.${file.type}`, file)
  }

}
