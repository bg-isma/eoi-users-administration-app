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
  phone = ''
  contactEmail = ''
  city = ''
  description = ''
  laborSituationSelected = ""
  name = '' // awdawdsa
  birthday = '';
  experience = {
    company: '',
    time: ''
  }
  course = {
    name: '',
    img: '',
    hours: '',
    description: '',
    skills : [],
    professors : [],
    area : '',
    year : '',
    modality : ''
  }
  newexperience: Experience[];
  newcourse: Course[]

  constructor( private route : ActivatedRoute, private alumnsService: AlumnsService ) { 
    this.alumnID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadAlumn()
  }

  loadAlumn() {
    this.alumnsService.getAlumnByID(this.alumnID).then( alumn => this.alumn = alumn )
  }
  dataAlumn(){
    

    if (this.name.length != 0){
      this.alumn.name = this.name;
    };
    if (this.birthday.length != 0){
      this.alumn.birthday = this.birthday;
    };
    if (this.laborSituationSelected.length != 0){
      this.alumn.laborSituation = this.laborSituationSelected;
    };
    if (this.phone.length != 0){
      this.alumn.phone = this.phone;
    };
    if (this.city.length != 0){
      this.alumn.city = this.city;
    };
    if (this.decription.length != 0){
      this.alumn.description = this.description;
    };
    if (this.contactEmail.length != 0){
      this.alumn.contactEmail = this.contactEmail;
    };
    this.alumnsService.updateAlumn(this.alumnID, this.alumn)
    .then( res => console.log("Se han modificado correctamente"))
    .catch( err => console.log("No se ha podido modificar los datos correctamente"));
    this.laborSituations = [
      "Estudiante",
      "Desempleado",
      "Trabajando"
    ]
  }
  enterEditMode(){
      this.editMode = true;
  }
  exitEditMode(){
    this.editMode = false;
  }
}