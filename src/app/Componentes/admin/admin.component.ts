import { Component, OnInit } from '@angular/core';
import { AlumnsService } from '../../alumns.service';
import { Alumn } from '../../Interfaces/alumn'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private alumnService: AlumnsService) {}

  alumns = []
  courses = []
  default = ""
  newAlumn : Alumn = {
    id: "",
    password: "",
    loginEmail: "",
    mainCourse: ""
  }; 
  
  generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  createNewAlumn(){
    this.newAlumn.id = this.generateId();
    this.alumnService.addOne(this.newAlumn)
      .then(newAlumn => {
        this.alumns.push(this.newAlumn);
        this.newAlumn = { id: "", password: "", loginEmail: "", mainCourse:""}
      });
  }

  ngOnInit(): void {
  }
 
}
