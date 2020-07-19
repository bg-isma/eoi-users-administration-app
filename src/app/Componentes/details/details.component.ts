import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { AlumnsService } from 'src/app/alumns.service';
import { Alumn } from 'src/app/Interfaces/alumn';
import { Course } from 'src/app/Interfaces/course';
import { Experience } from 'src/app/Interfaces/experience';
import { Session } from 'src/app/Interfaces/session';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { CoursesService } from 'src/app/services/courses.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  //addOnBlur = true;
  //selectable = true;
  //removable = true;
  //separatorKeysCodes: number[] = [ENTER, COMMA];
  alumnID = ''
  alumn: any = { id: '', name: '', password: '', mainCourse: '', loginEmail: '', birthday: '', experiences: []  }
  editMode: boolean = false
  userLogged: boolean = false
  decription: string = '';
  laborSituations: string[] = [
    "Estudiante",
    "Desempleado",
    "Trabajando"
  ]
  /*modalities: string[] = ["Presencial", "On-line", "Semi-presencial"]*/
  courses : Course[] ;
  
  laborSituationSelected = this.alumn.laborSituation
  /*modalitySelected = "Presencial"*/
  courseSelected = "Desarrollo Web Angular"
  name = '' // awdawdsa
  birthday = '12/07/1999';

  randomColor = () => "000000".replace(/0/g, function(){return (~~(Math.random()*16)).toString(16);})
  generateId = () => '_' + Math.random().toString(36).substr(2, 9);
  newexperience: any = {
    id: this.generateId(),
    company: '',
    time: 0,
    startYear: '',
    endYear: '',
    isYear: false
  };

  thisAlumn: any = {
    name: '',
    phone: '',
    contactEmail : '',
    city:'',
    description : 'Describete para que podamos saber algo mas sobre ti',
    birthday: '',
    laborSituation: '',
    password: this.alumn.password,
    loginEmail: this.alumn.loginEmail,
    mainCourse: this.alumn.mainCourse,
    courses: [],
    experiences: []
  }
  picker = '';
  year = new Date().getFullYear();
  file: File = null;
  sessionAdmin : Session; 
  sessionAlumn : Alumn; 
  isAddExperienceOpen = false;
  windowWidth = window.innerWidth

  constructor( private route : ActivatedRoute, private alumnsService: AlumnsService, private courseService : CoursesService ) { 
    this.alumnID = this.route.snapshot.paramMap.get('id');
  }

  onResize(event) { this.windowWidth = window.innerWidth }

  ngOnInit() {
    this.loadAlumn();
    this.isSomeoneLogged();
    this.loadCourses();
  }

  loadAlumn() {
    this.alumnsService.getAlumnByID(this.alumnID).then( alumn => { 
      this.alumn = {
        ...alumn,
        courseImg: alumn.courses.find( course => course.name == alumn.mainCourse ).img
      }
      this.thisAlumn = {
        ...alumn,
        courseImg: alumn.courses.find( course => course.name == alumn.mainCourse ).img
      }

      if (this.alumn.experiences == undefined) {
        this.alumn.experiences = []
        this.thisAlumn.experiences = []
      }

      this.laborSituationSelected = alumn.laborSituation
    })
  }

  loadCourses () { this.courseService.getAll().then( response => this.courses = response ).catch(err => console.log(`Hay un error ${err}`)) }

  enterEditMode () {
    if( (this.sessionAdmin || this.sessionAlumn.id == this.alumn.id) ){
      if (this.editMode) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
    }
  }

  onFileChange(event) { 
    this.file = event.target.files[0]; 
    var reader = new FileReader();
    reader.onload = (e) => { this.thisAlumn.img = e.target.result };
    reader.readAsDataURL(this.file)
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

  closeAddExperience() { this.isAddExperienceOpen == false ? this.isAddExperienceOpen = true : this.isAddExperienceOpen = false; }
  
  addExperience() {
    if (this.newexperience.time != undefined && this.newexperience.company.length != 0) {
      if (this.newexperience.time >= 12) {
        this.newexperience.isYear = true;
        this.newexperience.time = Math.floor(this.newexperience.time / 12) 
      } else {
        this.newexperience.isYear = false;
      }
      this.thisAlumn.experiences.push({...this.newexperience}) 
      this.newexperience = { id: this.generateId(), company: '', time: undefined, startYear: '', endYear: '' };
    }
    this.isAddExperienceOpen = false;
  }
  addCourse () {
    if (!this.thisAlumn.courses.some( course => course.name == this.courseSelected)) {
      this.thisAlumn.courses.push(this.courses.find(course => course.name == this.courseSelected))
    }
  }

  deleteExperience (id) { this.thisAlumn.experiences = this.thisAlumn.experiences.filter( experience => experience.id != id) }
  deleteCourse (name) { this.thisAlumn.courses = this.thisAlumn.courses.filter( course => course.name != name) }

  dataAlumn () {
    if (this.editMode) {
      if (this.thisAlumn.birthday != this.alumn.birthday) {
        this.thisAlumn.birthday = `${this.thisAlumn.birthday.getDay()}/${this.thisAlumn.birthday.getMonth()}/${this.thisAlumn.birthday.getFullYear()}`;
      }
      this.thisAlumn.laborSituation = this.laborSituationSelected;
      if (this.file == null){
        this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn);
      } else { this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn, this.file); }
    }
    this.enterEditMode()
  }

  changeMainCourse(name) {
    this.thisAlumn.mainCourse = name;
    this.thisAlumn.courseImg = this.courses.find( course => course.name == name ).img
  }

}