import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

import { EntrarComponent } from './entrar/entrar.component';


@NgModule({
  declarations: [
    LoginComponent,
    EntrarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
