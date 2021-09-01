import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './admin/model/model.component';
import { UserComponent } from './admin/user/user.component';
import { AccueilComponent } from './gabarits/accueil/accueil.component';
import { SinglArticleComponent } from './gabarits/singl-article/singl-article.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
// import { Erreur404Component } from './structure/erreur404/erreur404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  {path:"accueil", component:AccueilComponent},
  {path:"model", component:ModelComponent},
  {path:"user", component:UserComponent},
  {path:"singl-article", component:SinglArticleComponent},
  {path:"**", component:Erreur404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
