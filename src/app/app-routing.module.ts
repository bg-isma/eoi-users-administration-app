import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsComponent} from './Componentes/details/details.component';
import {LoginComponent} from './Componentes/login/login.component';
import {MasterComponent} from './Componentes/master/master.component';
import {AdminComponent} from './Componentes/admin/admin.component';

const routes: Routes = [
  { path: '', component: MasterComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path:  'admin', component: LoginComponent },
  { path: 'login' , component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
