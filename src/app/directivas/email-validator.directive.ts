import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})

export class EmailValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {

    const elementValue = control.value;
    if(elementValue === null || elementValue === undefined || elementValue === ''){
      return { cus_required : true}
    }
    const reg = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-zA-Z]{2,4}$');
    if(!reg.test(elementValue)){
      return{ shouldMatchPattern: true };
    }  
    //Devuelve nulo si no hay error en la validación.
    return null;

  }
 
}
