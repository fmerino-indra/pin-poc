import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { EntrarComponent } from './entrar/entrar.component';

const routes: Routes = [
    // { path: '', redirectTo: '/hello', pathMatch: 'full' },
    // { path: 'hello', component: HelloComponent },
    // { path: 'oauth2/redirect', component: EntrarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
