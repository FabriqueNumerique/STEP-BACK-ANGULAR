import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erreur404Component } from './structure/erreur404/erreur404.component';

const routes: Routes = [
  {path:"**", component:Erreur404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
