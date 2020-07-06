import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/Interfaces/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  currentSession : Session  = {email: "", password: ""}; 

  ngOnInit(): void {
  }

  login(){
    //Comprobar si nos estamos logueando como administrador y como usuario
    

  }
}
