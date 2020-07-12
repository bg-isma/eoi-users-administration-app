import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup; 
  modalities: string[] = ["Presencial", "On-line", "Semi-presencial"];
  constructor() { 
    this.courseForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup() {
    return new FormGroup({
      courseRequest : new FormGroup({
        name: new FormControl(),
        hours:new FormControl(), 
        description: new FormControl(),
        area :new FormControl(),
        year : new FormControl(),
        modality : new FormControl(),
      })
    });
  }

  onSubmit() {
    
  }
}
