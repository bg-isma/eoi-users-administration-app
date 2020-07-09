import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router : Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      let session = JSON.parse(window.localStorage.getItem('currentSession'));
      if (session && Object.keys(session).includes('email') ) {
        return true;
      } else {
        this.router.navigate(['/']);
      };
  }
  
}
