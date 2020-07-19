import { Component, OnInit } from '@angular/core';
import { AlumnsService } from '../../alumns.service';
import { Alumn } from '../../Interfaces/alumn'
import { Course } from 'src/app/Interfaces/course';
import { NgForm, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Session } from 'src/app/Interfaces/session';
import { Router } from "@angular/router"
import * as xlsx from 'xlsx';
import { CoursesService } from 'src/app/services/courses.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  alumns = [];
  courses: Course[] = [];
  newcourse: Course = {
    name: '',
    img: '',
    hours: undefined,
    description: '',
    skills : [],
    professors : [
      `wadaw`
    ],
    area : '',
    year : '',
    modality : ''
  };
 /* modalities: string[] = ["Presencial", "On-line", "Semi-presencial"];
  modalitySelected = "Presencial";
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  selectable = true;
  course: Course = {
    name: "",
    img: "",
    description: "",
    skills : [],
    professors : [],
    area : "",
    year : "",
    modality : ""
  };*/

  default = "";
  newAlumn : Alumn = {
    name : "",
    id: "",
    password: "",
    loginEmail: "",
    mainCourse: "Desarrollo Web Angular", 
    courses : []
  }; 
 
  alumnos : Alumn[];
  excelAlumn: Alumn;
  excelAlumnList = [

  ]; 
  isDraging=false;
  registeringExistingUser : boolean;

  session : Session; 

  constructor(private alumnService: AlumnsService, private loginService :LoginService, private router: Router, private courseService : CoursesService ) {
}

  generateId = () => '_' + Math.random().toString(36).substr(2, 9);
  async createNewAlumn(myForm: NgForm){
   let course = this.courses.find(course => course.name == this.newAlumn.mainCourse);
   this.newAlumn.courses.push(course);  
    let listRepeatedAlumn = await this.alumnService.isRepeatedAlumn(this.newAlumn.loginEmail);
    if(myForm.valid && listRepeatedAlumn.length == 0 ){
      this.newAlumn.id = this.generateId();
      console.log(this.newAlumn)
      this.alumnService.addOne(this.newAlumn)
      .then( newAlumn => {
        this.alumns.push(newAlumn);
        this.newAlumn = { name:"", id: "", password: "", loginEmail: "", mainCourse:"", courses: []};
        myForm.reset();
      });
    }
  }
  
  ngOnInit(): void { 
    this.session = JSON.parse(window.localStorage.getItem('currentSession')); 
    this.loadCourses();
    this.registeringExistingUser = false;
  }


  isLoading = false;
  isExcellLoaded = false;
  fileName = '';

  deleteFile() {
    this.fileName = ''
    this.isExcellLoaded = false;
    this.excelAlumnList = [];
  }

  dragAndDropFile (event) {
    this.isLoading = true;
    this.isExcellLoaded = true;
    this.fileName = event.target.files[0].name

    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e: any) => {

      const wb = xlsx.read(e.target.result, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      let data : any [] = (xlsx.utils.sheet_to_json(ws, {header: 1}));
      data = data.filter( (row: any[]) => row.length > 0 )

      console.log(event.timeStamp);
      this.excelAlumnList = data.slice(1).map((fila : any[])=> {
        return {
          id: this.generateId(),
          name: fila[0],
          loginEmail: fila[1],
          password: fila[2].toString(),
          mainCourse: fila[3],
          courses: [],
          courseImg: this.courses.find(course => course.name == fila[3]).img
        }
      });

      this.isLoading = false;
    };
  }

  onFileChange(event) {
    this.isLoading = true;
    this.isExcellLoaded = true;
    this.fileName = event[0].name
    
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(event[0]);
    reader.onload = (e: any) => {

      const wb = xlsx.read(e.target.result, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      let data : any [] = (xlsx.utils.sheet_to_json(ws, {header: 1}));
      data = data.filter( (row: any[]) => row.length > 0 )

      this.excelAlumnList = data.slice(1).map((fila : any[])=> {
        return {
          name: fila[0],
          loginEmail: fila[1],
          password: fila[2].toString(),
          mainCourse: fila[3],
          courses: [],
          courseImg: this.courses.find(course => course.name == fila[3]).img, 
          registeringExistingUser: false
        }
      });

      this.isLoading = false;
    };
   
  }

  deleteAlumn(alumno: Alumn){
    this.excelAlumnList = this.excelAlumnList.filter(alumn => alumn.id != alumno.id);
  }

  async addAlumnToDB(alumno: any){
    let listRepeatedAlumn = await this.alumnService.isRepeatedAlumn(alumno.loginEmail);
    if(listRepeatedAlumn.length == 0 ){
      let course = this.courses.find(course => course.name == alumno.mainCourse);
      alumno.courses.push(course); 
      alumno.id = this.generateId();
      this.alumnService.addOne(alumno)
        .then( newAlumn => {
          this.alumns.push(newAlumn);
          this.deleteAlumn(newAlumn);
        });
      console.log("Estamos añadiendo a la BD");
    }else {
      alumno.registeringExistingUser = true;
    }
  }

  loadCourses(){
    this.courseService.getAll()
      .then( response => this.courses = response)
      .catch(err => console.log(`Hay un error ${err}`))
  }

  /*createNewCourse(){
    
    console.log(this.course);
    if (this.course.name.length != 0) {
      this.newcourse.name = this.course.name;
      this.newcourse.hours = this.course.hours;
      this.newcourse.description = this.course.description;
      this.newcourse.area = this.course.area;
      this.newcourse.year = this.course.year;
      this.newcourse.modality = this.modalitySelected;
      console.log("admin.ts")
      console.log(this.newcourse)

      this.courseService.addOne(this.newcourse)
      .then(
        newcourse => {
          this.courses.push(this.newcourse);
          this.newcourse = {
            name: '',
            img: '',
            hours: undefined,
            description: '',
            skills : [],
            professors : [],
            area : '',
            year : '',
            modality : ''
          }
          this.modalities = ["Presencial", "On-line", "Semi-presencial"];
    
        }
      )
      .catch(
        err => err = console.log("Hay un error")
      )
    }
    
  }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      if (value || '') {
        this.newcourse.skills.push(value);
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(skill): void {
      const index = this.newcourse.skills.indexOf(skill);
  
      if (index >= 0) {
        this.newcourse.skills.splice(index, 1);
      }
    }*/
   /* addProf(event: MatChipInputEvent): void {
      const put = event.input;
      const valor = event.value;
  
      if (valor || '') {
        this.newcourse.professors.push(valor);
      }
  
      // Reset the input value
      if (put) {
        put.value = '';
      }
    }*/
  //Poder eliminar chips de palabras.
  /*  removed(skill): void {
      const index = this.newcourse.professors.indexOf(skill);
  
      if (index >= 0) {
        this.newcourse.professors.splice(index, 1);
      }
    }*/

  }
