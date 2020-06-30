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
    this.alumnsService.getAll().then( alumns => {
      console.log(alumns);
      this.alumns = alumns
    })
  }

  search() {
    
  }


}
