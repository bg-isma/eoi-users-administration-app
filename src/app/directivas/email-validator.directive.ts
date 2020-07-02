import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})

export class EmailValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    console.log("estoy llegando aqui");
    const elementValue = control.value;
    if(elementValue === null || elementValue === undefined || elementValue === ''){
      return { cus_required : true}
    }

    const reg = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
    if(!reg.test(control.value)){
      return{ shouldMatchPattern: true };
    }  
    //Devuelve nulo si no hay error en la validación.
    return null;

  }

  /*registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }*/

  static emailValidation(control: AbstractControl): ValidationErrors | null {
    console.log("estoy llegando aqui");
    const reg = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
      if(!reg.test(control.value)){
          return{ shouldMatchPattern: true };
      }
    

      // If there is no validation failure, return null
      return null;
  }

 
}
