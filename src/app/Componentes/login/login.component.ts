import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/Interfaces/session';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router"
import { Alumn } from 'src/app/Interfaces/alumn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  dataLogin : Session  = {email: "", password: ""}; 

  ngOnInit(): void {
  }

  async login(){
    //Comprobar si nos estamos logueando como administrador 
    let admin = await this.loginService.validateAdmin(this.dataLogin);
    
    if(admin.length == 0 ) console.log("Sorry no eres admin");
    if(admin.length == 1 && admin[0].password === this.dataLogin.password){
      window.localStorage.setItem('currentSession', JSON.stringify(admin[0]));
      this.router.navigate(['/admin']);
    }else {
      console.log("Wrong Password");
    }

    //Comprobar si nos logueamos como usuario
    let user = await this.loginService.validateUser(this.dataLogin);

    if(user.length == 0 ) console.log("Sorry no existes dentro la BD");
    if(user.length == 1 && user[0].password === this.dataLogin.password){
      window.localStorage.setItem('currentSession', JSON.stringify(user[0]));
      window.location.href = '/';
    } else {
      console.log("Wrong Password");  
    }
    
  }
}
