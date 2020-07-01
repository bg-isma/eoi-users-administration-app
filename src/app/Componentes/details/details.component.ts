import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { AlumnsService } from 'src/app/alumns.service';
import { Alumn } from 'src/app/Interfaces/alumn';

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
  phone= ''
  contactEmail = ''
  city: ''

  constructor( private route : ActivatedRoute, private alumnsService: AlumnsService ) { 
    this.alumnID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadAlumn()
  }

  loadAlumn() {
    this.alumnsService.getAlumnByID(this.alumnID).then( alumn => this.alumn = alumn )
  }

}
