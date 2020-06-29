import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsComponent} from './Componentes/details/details.component';
import {LoginComponent} from './Componentes/login/login.component';
import {MasterComponent} from './Componentes/master/master.component';

const routes: Routes = [
  {path: 'details', component: DetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: MasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
