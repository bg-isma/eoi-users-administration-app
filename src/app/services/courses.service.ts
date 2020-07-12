import { Injectable } from '@angular/core';
import { Course } from '../Interfaces/course';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = "http://localhost:3000/courses";
  constructor() { }

  getAll(): Promise<Course[]> {
    return axios.get(`${this.url}`)
      .then(courses => courses.data)
      .catch(err => console.log(`Hay un error ${err}`));
  }

  async addOne(course: Course): Promise<Course> {

    return axios.post(this.url, course)
      .then(course => course.data)
  }

}

