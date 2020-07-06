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

  currentSession : Session  = {email: "", password: ""}; 

  ngOnInit(): void {
  }

  login(){
    //Comprobar si nos estamos logueando como administrador 
    

    //Comprobar si nos logueamos como usuario

    
  }
}
