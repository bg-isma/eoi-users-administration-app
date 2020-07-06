import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { AlumnsService } from 'src/app/alumns.service';
import { Alumn } from 'src/app/Interfaces/alumn';
import { Course } from 'src/app/Interfaces/course';
import { Experience } from 'src/app/Interfaces/experience';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  alumnID = ''
  alumn: Alumn = { id: '', name: '', password: '', mainCourse: '', loginEmail: '' }
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

  constructor( private route : ActivatedRoute, private alumnsService: AlumnsService ) { 
    this.alumnID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadAlumn()
  }

  loadAlumn() {
    this.alumnsService.getAlumnByID(this.alumnID).then( alumn => { 
      this.alumn = alumn 
      this.thisAlumn = alumn
      this.laborSituationSelected = alumn.laborSituation
    })
  }
  addExperience(){
    if (this.experience.time > 0 && this.experience.company.length != 0) {
      this.newexperience.time = this.experience.time;
      this.newexperience.company = this.experience.company;
      this.thisAlumn.experiences.push(this.newexperience);
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
      this.thisAlumn.courses.push(this.newcourse)
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
    this.thisAlumn.laborSituation = this.laborSituationSelected
    this.alumnsService.updateAlumn(this.alumnID, this.thisAlumn)
    .then( res => console.log("Se han modificado correctamente"))
    .catch( err => console.log("No se ha podido modificar los datos correctamente"));
    this.laborSituations = ["Estudiante", "Desempleado", "Trabajando"];
  }
  enterEditMode(){
      this.editMode = true;
  }
  exitEditMode(){
    this.editMode = false;
  }

  onFileChange(event) {
    const file = event.target.files[0];
  }
}