import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { AlumnsService } from 'src/app/alumns.service';
import { Alumn } from 'src/app/Interfaces/alumn';
import { Course } from 'src/app/Interfaces/course';
import { Experience } from 'src/app/Interfaces/experience';
import { Session } from 'src/app/Interfaces/session';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  addOnBlur = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  alumnID = ''
  alumn:any= { id: '', name: '', password: '', mainCourse: '', loginEmail: '', birthday: ''  }
  editMode: boolean = false
  userLogged: boolean = false
  decription: string = '';
  laborSituations: any[] = [
    "Estudiante",
    "Desempleado",
    "Trabajando"
  ]
  modalities: string[] = ["Presencial", "On-line", "Semi-presencial"]
  courses = [
    "Desarrollo Web Angular",
    "Marketing Digital",
    "Sonido directo y diseño sonoro",
  ]
  
  laborSituationSelected = "Estudiante"
  modalitySelected = "Presencial"
  courseSelected = "Desarrollo Web Angular"
  name = '' // awdawdsa
  birthday = '';
  experience: Experience = {
    company: '',
    time: undefined,
  }
  course: Course = {
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
  newexperience: Experience = {
    company: '',
    time: 0
  };
  newcourse: Course = {
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
  thisAlumn: any = {
    name: '',
    phone : '',
    contactEmail : '',
    city :'',
    description : '',
    birthday: '',
    laborSituation: ''
  }
  year = new Date().getFullYear();
  file: File = null;
  sessionAdmin : Session; 
  sessionAlumn : Alumn; 

  constructor( private route : ActivatedRoute, private alumnsService: AlumnsService ) { 
    this.alumnID = this.route.snapshot.paramMap.get('id');
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
  }
  addProf(event: MatChipInputEvent): void {
    const put = event.input;
    const valor = event.value;

    if (valor || '') {
      this.newcourse.professors.push(valor);
    }

    // Reset the input value
    if (put) {
      put.value = '';
    }
  }

  removed(skill): void {
    const index = this.newcourse.professors.indexOf(skill);

    if (index >= 0) {
      this.newcourse.professors.splice(index, 1);
    }
  }

  ngOnInit() {
    this.loadAlumn();
    this.isSomeoneLogged();
  }

  loadAlumn() {
    this.alumnsService.getAlumnByID(this.alumnID).then( alumn => { 
<<<<<<< HEAD
      this.alumn = alumn;
      this.thisAlumn = alumn;
      this.laborSituationSelected = alumn.laborSituation;
      this.alumn.courseImg = alumn.courses.filter(course => course.name == alumn.mainCourse)[0].img;
=======
      this.alumn = {
        ...alumn,
        courseImg: alumn.courses.find( course => course.name == alumn.mainCourse ).img
      }
      this.thisAlumn = {
        ...alumn,
        courseImg: alumn.courses.find( course => course.name == alumn.mainCourse ).img
      }
      this.laborSituationSelected = alumn.laborSituation
>>>>>>> new filters, details css
    })
  }
  addExperience(){
    if (this.experience.time > 0 && this.experience.company.length != 0) {
      this.newexperience.time = this.experience.time;
      this.newexperience.company = this.experience.company;
      this.thisAlumn.experiences.push(this.newexperience);
      this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn);
      this.newexperience = {company: '', time: undefined};
    }
  }
  addCourse(){
    if (this.course.name.length != 0) {
      this.newcourse.name = this.course.name;
      this.newcourse.hours = this.course.hours;
      this.newcourse.description = this.course.description;
      this.newcourse.area = this.course.area;
      this.newcourse.year = this.course.year;
      this.newcourse.modality = this.modalitySelected;
      this.thisAlumn.courses.push(this.newcourse);
      this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn);
      console.log(this.thisAlumn);
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
    }
  this.modalities = ["Presencial", "On-line", "Semi-presencial"];
  }
  dataAlumn(){
    //console.log(this.thisAlumn);
    this.thisAlumn.laborSituation = this.laborSituationSelected;
    if(this.file == null ){
      console.log("File es nullo");
      this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn);
    }else{
      console.log(this.file);
      this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn, this.file);
    }
    this.laborSituations = ["Estudiante", "Desempleado", "Trabajando"];
  }

  enterEditMode (){
    if( (this.sessionAdmin || this.sessionAlumn.id == this.alumn.id) ){
      this.editMode = true;
   }
  }

  exitEditMode(){
    this.editMode = false;
  }

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  isSomeoneLogged(){
    let session = JSON.parse(window.localStorage.getItem('currentSession'));
    if(session && Object.keys(session).includes('email') ){
      this.sessionAdmin = session;
      console.log(this.sessionAdmin);
    } else if (session && Object.keys(session).includes('loginEmail')){
      this.sessionAlumn = session;
      console.log(this.sessionAlumn);
    }
  }
}