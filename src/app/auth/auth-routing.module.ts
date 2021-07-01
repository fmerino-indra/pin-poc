import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntrarComponent } from './entrar/entrar.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'oauth2/redirect', component: EntrarComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
