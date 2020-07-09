import { Component, OnInit, HostListener, ElementRef, ViewChild} from '@angular/core';
import { AlumnsService } from '../../alumns.service';
import { Alumn } from '../../Interfaces/alumn'
import { Course } from 'src/app/Interfaces/course';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Session } from 'src/app/Interfaces/session';
import { Router } from "@angular/router"
import * as xlsx from 'xlsx';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  alumns = [];
  courses: Course[] = [{
    name: "Desarrollo Web Angular",
    hours: 250, 
    img: "https://www.spegc.org/wp-content/uploads/2020/02/desarrolloweb-angular9-cursos2020-marzo-1024x525.jpg",
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
    img : "https://d3t4nwcgmfrp9x.cloudfront.net/upload/cinco-errores-comunes-las-empresas-espanolas-marketing-digital.jpg",
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
    img: "https://blog.edx.org/wp-content/uploads/2018/01/Produccion-musical-.jpg" ,
    description: "Conocer los fundamentos del sonido directo, profundizando en la figura del diseñador sonoro",
    skills: ["Efectos de sonido", "Pre-producción"],
    professors : ["Joaquin Pachón"],
    area : "Audiovisual",
    year : "2020",
    modality : "online"
  }];

  default = "";
  newAlumn : Alumn = {
    name : "",
    id: "",
    password: "",
    loginEmail: "",
    mainCourse: "", 
    courses : []
  }; 
 
  alumnos : Alumn[];
  excelAlumnList = [
    {
      id: 'string',
      name: 'Ismael Bola',
      password : 'string',
      loginEmail: 'ismaelbg_99@hotmail.com',
      mainCourse: {
        img: 'https://picsum.photos/id/640/536/354.jpg'
      }
    },
    {
      id: 'string',
      name: 'Ismael Bola',
      password : 'string',
      loginEmail: 'ismaelbg_99@hotmail.com',
      mainCourse: {
        img: 'https://picsum.photos/id/640/536/354.jpg'
      }
    }
  ]
  isDraging=false;

  session : Session; 
  constructor(private alumnService: AlumnsService, private loginService :LoginService, private router: Router ) {
    let session = JSON.parse(window.localStorage.getItem('currentSession'));
    if (session && Object.keys(session).includes('email') ) {
      this.session = session;

    } else {
      this.router.navigate(['/']);
    }
      
  }

  generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  async createNewAlumn(myForm: NgForm){
    let course = this.courses.find(course => course.name == this.newAlumn.mainCourse)
    this.newAlumn.courses.push(course);  
    let listRepeatedAlumn = await this.alumnService.isRepeatedAlumn(this.newAlumn.loginEmail);
    if(myForm.valid && listRepeatedAlumn.length == 0 ){
      this.newAlumn.id = this.generateId();
      this.alumnService.addOne(this.newAlumn)
      .then( newAlumn => {
        this.alumns.push(newAlumn);
        this.newAlumn = { name:"", id: "", password: "", loginEmail: "", mainCourse:""};
        myForm.reset();
      });
    }  
  }
  
  ngOnInit(): void {}

  onFileChange(event) {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e: any) => {

      const wb = xlsx.read(e.target.result, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = (xlsx.utils.sheet_to_json(ws, {header: 1}));
      console.log(data);
      this.createAlumnFromExcell( data.slice(1).map( fila => {
          return {
            name: fila[0],
            loginEmail: fila[1],
            password: fila[2],
            mainCourse: fila[3],
            courses : []
          }
        
      }));
    };
   
  }

  createAlumnFromExcell(alumnos : any){
     alumnos.forEach(async (alumno) => {
      let listRepeatedAlumn = await this.alumnService.isRepeatedAlumn(alumno.loginEmail);
      if(listRepeatedAlumn.length == 0 ){
        let course = this.courses.find(course => course.name == alumno.mainCourse);
        alumno.courses.push(course);  
        alumno.id = this.generateId;
        this.alumnService.addOne(alumno)
          .then( excelAlumn => this.excelAlumnList.push(alumno) )
          .catch (err => console.log(`Hay un error ${err}`))
      }
      
    });
  }

}




