import { Injectable } from '@angular/core';
import axios from 'axios';
import { Alumn } from './Interfaces/alumn'
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

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
  async addOne(alumn: Alumn): Promise<Alumn> {
    alumn.phone = '',
    alumn.contactEmail = alumn.loginEmail,
    alumn.city = '',
    alumn.description = '',
    alumn.birthday = '',
    alumn.laborSituation = 'Desempleado'

    return axios.post(this.url, alumn)
      .then(alumn => alumn.data)
  }

  // delete - Ana
  deleteAlumn(id: string) {
    return axios.delete(`${this.url}/${id}`);
  }

  // update
  async updateAlumn(id: string, alumno: Alumn, file?: File) {
    if (file) {
      const path = `upload/${id}.${file.name.split('.')[1]}`;

      this.uploadUserPhoto(file, alumno.id, path).then(resp => {
        this.storage.ref(path).getDownloadURL().subscribe(res => {
          alumno.img = res;
          return axios.put(`${this.url}/${id}`, alumno).then(response => response).catch(err => { console.log(`Algo salio mal ${err}`) })
        })
      }).catch(err => { console.log(`Algo salio mal ${err}`) })

    } else {
      console.log("El fichero de foto es nulo, solo actualizamos datos");
      return axios.put(`${this.url}/${id}`, alumno).then(response => response).catch(err => { console.log(`Algo salio mal ${err}`) });
    }

  }

  /* 
    Recoge un alumno por id 
    @param string Id de un alumno
  */
  getAlumnByID = (id: string): Promise<Alumn> => axios.get(`${this.url}/${id}`).then(alumn => alumn.data).catch(err => console.log('isma la cago en el by id '));

  isRepeatedAlumn(email: string): Promise<Alumn[]> {
    return axios.get(`${this.url}?loginEmail=${email}`)
      .then(response => response.data)
      .catch(err => console.log(`Algo salio mal ${err}`))

  }

  uploadUserPhoto(file: File, id: string, path: string): Promise<UploadTaskSnapshot> {
    return this.storage.upload(path, file).then(res => {
      console.log(res);
    })
  }

}
