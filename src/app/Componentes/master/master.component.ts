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
  locations = [
    "none",
    "Las Palmas",
    "Madrid",
    "Barcelona"
  ]
  courses = [
    "none",
    "Desarrollo Web Angular",
    "Marketing Digital",
    "Sonido directo y diseño sonoro",
  ]
  laborSituations = [
    "none",
    "Desempleado",
    "Estudiante",
    "Trabajando"
  ]


  /* Variables en caliente de los selects del filtro */
  locationSelected = "none"
  courseSelected = "none"
  laborSituationSelected = "none"



  constructor(private alumnsService: AlumnsService) { }

  ngOnInit(): void {
    this.loadAlumns()
  }


  /* 
    Recoge todos los alumnos de la base de datos 
  */
  loadAlumns() {
    this.alumnsService.getAll(0).then(alumns => this.alumns = alumns)
  }

  search() {
    this.alumns = []

    this.courseSelected = 'none'
    this.laborSituationSelected = 'none'
    this.locationSelected = 'none'

    const words = this.searchText.split(' ')

    if (this.searchText !== '') {
      words.forEach( word => {
        this.alumnsService.getAllByCourse(word, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn) 
        }))
        this.alumnsService.getAllByName(word, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn) 
        }))
      }) 
    } else {
      this.loadAlumns()
    }
  }

  filterAlumns() {
  
    this.alumns = []
    
    if (this.courseSelected == 'none' && this.locationSelected == 'none' && this.laborSituationSelected == 'none') {
      this.loadAlumns()
    } else {
      
      if (this.courseSelected != 'none') {
        this.alumnsService.getAllByCourse(this.courseSelected, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn)
        }))
      }
  
      if (this.laborSituationSelected != 'none') {
        this.alumnsService.getAllByLaborSituation(this.laborSituationSelected, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn)
        }))
      }
  
      if (this.locationSelected != 'none') {
        this.alumnsService.getAllByLocation(this.locationSelected, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn)
        }))
      }

    }

  }

}
