import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourseRequest } from 'src/app/Interfaces/course-request';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;
  @ViewChild('chipListProf') chipProfessor: MatChipList;
  courseForm: FormGroup; 
  modalities: string[] = ["Presencial", "On-line", "Semi-presencial"];
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  selectable = true;
  newCourse : Course = {
    name: "",
    description: "",
    skills : [],
    professors : [],
    area : "",
    year : "",
    modality : "Presencial"
  };
  @Output() notifyAdmin = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private courseService : CoursesService ) { 
    this.courseForm = this.createFormGroupWithBuilder(formBuilder);
  }

  ngOnInit(): void {
    this.courseForm.get('course.skills').statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
    );
    this.courseForm.get('course.professors').statusChanges.subscribe(
      status => this.chipProfessor.errorState = status === 'INVALID'
    );
  }

  createFormGroupWithBuilder(formBuilder : FormBuilder) {
    return formBuilder.group({
      course : formBuilder.group({ 
        name: ['' , [
          Validators.required,
          Validators.minLength(20)
        ]],
        hours: ['',[
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.maxLength(3)
        ]], 
        description: ['',[
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(120)
        ]],
        area :['',[
          Validators.required,
          Validators.minLength(4)
        ]] ,
        year :['',[
          Validators.required,
          Validators.pattern('20[0-9]{2}')
        ]],
        modality : 'Presencial',
        skills: formBuilder.array([], this.validateArrayNotEmpty),
        professors : formBuilder.array([], this.validateArrayNotEmpty)
      }),
    });
  }

  //Se usan para acceder a los  controloes-valores
  get name (){ return this.courseForm.get('course.name')}
  get hours (){ return this.courseForm.get('course.hours')}
  get description (){ return this.courseForm.get('course.description')}
  get area (){ return this.courseForm.get('course.area')}
  get year (){ return this.courseForm.get('course.year')}
  get modality (){ return this.courseForm.get('course.modality')}
  get skills () { return <FormArray>this.courseForm.get('course.skills')}
  get professors() { return <FormArray>this.courseForm.get('course.professors')}

  onSubmit() {
        // Make sure to create a deep copy of the form-model
        const curso: Course = Object.assign({}, this.courseForm.value.course);
       this.courseService.addOne(curso)
          .then( result => {
            this.revert();
            this.notifyAdmin.emit(curso);
          });
        
  }
  private revert(){
    //Restablece el objeto en blanco. 
    this.courseForm.reset();
    this.skills.controls = [];
    this.professors.controls = [];
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  initSkill(skill: string): FormControl {
    return this.formBuilder.control(skill);
  }
  initProfessor(professor: string): FormControl {
    return this.formBuilder.control(professor);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const control = <FormArray>this.courseForm.get('course.skills');
      control.push(this.initProfessor(value.trim()));

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(form,index: number): void {
    form.get('course.skills').removeAt(index);
    console.log(form);
  }
  addProf(event: MatChipInputEvent): void {
    const put = event.input;
    const valor = event.value;

    if ((valor || '').trim()) {
      const control = <FormArray>this.courseForm.get('course.professors');
      control.push(this.initSkill(valor.trim()));

    }

    // Reset the input value
    if (put) {
      put.value = '';
    }
  }
  removed(form,index : number): void {
    form.get('course.professors').removeAt(index);
    console.log(form);
  }

}
