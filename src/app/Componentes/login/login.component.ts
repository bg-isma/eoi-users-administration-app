import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/Interfaces/session';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  dataLogin : Session  = {email: "", password: ""}; 

  ngOnInit(): void {
  }

  async login(){
    //Comprobar si nos estamos logueando como administrador 
    

    //Comprobar si nos logueamos como usuario
    let user = await this.loginService.validateUser(this.dataLogin);
    if(user.length == 1 ){

    }
    
  }
}
