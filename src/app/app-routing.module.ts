import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaComponent } from './admin/media/media.component';
import { ModelComponent } from './admin/model/model.component';
import { UserComponent } from './admin/user/user.component';
import { AccueilComponent } from './gabarits/accueil/accueil.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'accueil'},
  {path:"accueil", component:AccueilComponent},
  {path:"model", component:ModelComponent},
  {path:"user", component:UserComponent},
  {path:"media", component:MediaComponent},
  {path: 'articles', loadChildren: () => import('./gabarits/articles/articles.module').then(m => m.ArticlesModule) },
  { path: 'templates', loadChildren: () => import('./gabarits/templates/templates.module').then(m => m.TemplatesModule) },
  {path:"**", component:Erreur404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
