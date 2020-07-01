import { Component, OnInit } from '@angular/core';
import { AlumnsService } from "../../alumns.service";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  alumns = []
  searchText = ""

  constructor( private alumnsService: AlumnsService ) { }

  ngOnInit(): void {
    this.loadAlumns()
  }


  /* 
    Recoge todos los alumnos de la base de datos 
  */
  loadAlumns() {
    this.alumnsService.getAll(0).then( alumns => {
      console.log(alumns);
      this.alumns = alumns
    })
  }

  search() {
    this.alumns = []
    if (this.searchText !== '') {
      this.alumnsService.getAllByCourse(this.searchText, 0).then( alumns => alumns.forEach( alumn => {this.alumns.push(alumn)}))
      this.alumnsService.getAllByName(this.searchText, 0).then( alumns => alumns.forEach( alumn => {this.alumns.push(alumn)}))
    } else {
      this.loadAlumns()
    }

  }


}
