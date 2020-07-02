import { Component, OnInit } from '@angular/core';
import { AlumnsService } from '../../alumns.service';
import { Alumn } from '../../Interfaces/alumn'
import { Course } from 'src/app/Interfaces/course';
import { NgModel, NgForm } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private alumnService: AlumnsService) {}

  alumns = [];
  courses: Course[] = [{
    name: "Desarrollo Web Angular",
    hours: 250, 
    description: "Aprendizaje profundo de Angular",
    skills: ["html", "Css", "Angular", "TypeScript"],
    professors : ["Jose Luis", "Alcibiades", "Alejandro de Juan", "Fernando Martín"],
    area : "Desarrollo Web",
    year : "2020",
    modality : "online"
  },
  {
    name: "Marketing Digital",
    hours: 300, 
    description: "Conceptos Básicos de Marketing aplicados a la era Digital",
    skills: ["Diseño", "Redes Sociales"],
    professors : ["Lola Flores", "Elisabet Cañas"],
    area : "Marketing y diseño",
    year : "2020",
    modality : "presencial"
  },
  {
  name: "Sonido directo y diseño sonoro",
  hours: 20, 
  description: "Conocer los fundamentos del sonido directo, profundizando en la figura del diseñador sonoro",
  skills: ["Efectos de sonido", "Pre-producción"],
  professors : ["Joaquin Pachón"],
  area : "Audiovisual",
  year : "2020",
  modality : "online"
}];

  default = "";
  newAlumn : Alumn = {
    id: "",
    password: "",
    loginEmail: "",
    mainCourse: ""
  }; 
  
  generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  createNewAlumn(myForm: NgForm){
    //if(){
    this.newAlumn.id = this.generateId();

    /*this.alumnService.addOne(this.newAlumn)
      .then(newAlumn => {
        this.alumns.push(this.newAlumn);
        this.newAlumn = { id: "", password: "", loginEmail: "", mainCourse:""}
      });*/
    //}  
    console.log(myForm);
    console.log(this.newAlumn) ;
     
  }

  ngOnInit(): void {}
}




