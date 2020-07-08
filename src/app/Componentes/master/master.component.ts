import { Component, OnInit } from '@angular/core';
import { AlumnsService } from "../../alumns.service";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '355px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('closed => open', 
        animate('0.5s')
      ),
      transition('open => closed', 
        animate('0.5s')
      )
    ]),
    trigger('enter', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity:1
      })),
      transition(':enter', 
        animate('0.3s', style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ),
    ])
  ]
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
  state = 'closed'

  year = new Date().getFullYear();

  constructor(private alumnsService: AlumnsService) { 
    window.innerWidth >= 800 ? this.isFilterBtnDisabled = false : this.isFilterBtnDisabled = true
  }

  ngOnInit(): void {
    this.loadAlumns()
  }


  /* 
    Recoge todos los alumnos de la base de datos 
  */
  loadAlumns() {
    this.alumnsService.getAll(0).then(alumns => { 
      alumns.forEach( (alumn, idx )=> {
        setTimeout(() => {
          this.alumns.push({
            ...alumn,
            courseImg: alumn.courses.find( course => course.name == alumn.mainCourse ).img
          })
        }, idx * 500)
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
    this.isFilterOpen == true ? this.state = 'closed' : this.state = 'open'
    this.isFilterOpen == true ? this.isFilterOpen = false : this.isFilterOpen = true
    console.log(this.state);
    
  }

  onResize(event) {
    event.target.innerWidth >= 800 ? this.isFilterBtnDisabled = false : this.isFilterBtnDisabled = true
  }

}
