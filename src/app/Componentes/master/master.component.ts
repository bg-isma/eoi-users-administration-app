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
    "Todos",
    "Las Palmas",
    "Madrid",
    "Barcelona"
  ]
  courses = [
    "Todos",
    "Desarrollo Web Angular",
    "Marketing Digital",
    "Sonido directo y diseño sonoro",
  ]
  laborSituations = [
    "Todos",
    "Desempleado",
    "Estudiante",
    "Trabajando"
  ]
  isFilterOpen = false;

  /* Variables en caliente de los selects del filtro */
  locationSelected = "Todos"
  courseSelected = "Todos"
  laborSituationSelected = "Todos"
  isFilterBtnDisabled = false;

  year = new Date().getFullYear();

  constructor(private alumnsService: AlumnsService) { 

  }

  ngOnInit(): void {
    this.loadAlumns()
  }


  /* 
    Recoge todos los alumnos de la base de datos 
  */
  loadAlumns() {
    this.alumnsService.getAll(0).then(alumns => { 
      this.alumns = alumns.map( alumn => {
        return {
          ...alumn,
          courseImg: alumn.courses.find( course => course.name == alumn.mainCourse ).img
        }
      })
    })
  }

  search() {
    this.alumns = []

    this.courseSelected = 'Todos'
    this.laborSituationSelected = 'Todos'
    this.locationSelected = 'Todos'

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
    let p1, p2, p3
    
    if (this.courseSelected == 'Todos' && this.locationSelected == 'Todos' && this.laborSituationSelected == 'Todos') {
      this.loadAlumns()
    } else {
      
      if (this.courseSelected != 'Todos') {
        p1 = this.alumnsService.getAllByCourse(this.courseSelected, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn)
        }))
      }
  
      if (this.laborSituationSelected != 'Todos') {
        p2 = this.alumnsService.getAllByLaborSituation(this.laborSituationSelected, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn)
        }))
      }
  
      if (this.locationSelected != 'Todos') {
        p3 = this.alumnsService.getAllByLocation(this.locationSelected, 0).then(alumns => alumns.forEach(alumn => { 
          this.alumns.some( actualAlumn => actualAlumn.id == alumn.id) ? true : this.alumns.push(alumn)
        }))
      }

      
      Promise.all([p1, p2, p3]).then( values => {
        if (this.locationSelected != 'Todos' && this.laborSituationSelected != 'Todos' && this.courseSelected != 'Todos') {
          this.alumns = this.alumns.filter( alumn => alumn.city == this.locationSelected && alumn.mainCourse == this.courseSelected && alumn.laborSituation == this.laborSituationSelected)
        } else if (this.locationSelected != 'Todos' && this.laborSituationSelected != 'Todos')  {
          this.alumns = this.alumns.filter( alumn => alumn.city == this.locationSelected  && alumn.laborSituation == this.laborSituationSelected)
        } else if (this.laborSituationSelected != 'Todos' && this.courseSelected != 'Todos') {
          this.alumns = this.alumns.filter( alumn => alumn.mainCourse == this.courseSelected && alumn.laborSituation == this.laborSituationSelected)
        } else if (this.locationSelected != 'Todos' && this.courseSelected != 'Todos') {
          this.alumns = this.alumns.filter( alumn => alumn.city == this.locationSelected  && alumn.mainCourse == this.courseSelected)
        }
      });


    }

  }

  openFilters () {
    this.isFilterOpen == true ? this.isFilterOpen = false : this.isFilterOpen = true
  }

  onResize(event) {
    event.target.innerWidth >= 800 ? this.isFilterBtnDisabled = false : this.isFilterBtnDisabled = true
  }

}
