import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './admin/model/model.component';
import { UserComponent } from './admin/user/user.component';
import { AccueilComponent } from './gabarits/accueil/accueil.component';
import { ArticleComponent } from './gabarits/article/article.component';
import { CategoryComponent } from './gabarits/category/category.component';
import { FileFieldsComponent } from './gabarits/file-fields/file-fields.component';
import { SinglArticleComponent } from './gabarits/singl-article/singl-article.component';
import { TagComponent } from './gabarits/tag/tag.component';
import { TemplateComponent } from './gabarits/template/template.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
// import { Erreur404Component } from './structure/erreur404/erreur404.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'accueil'},
  {path:"accueil", component:AccueilComponent},
  {path:"model", component:ModelComponent},
  {path:"user", component:UserComponent},
  {path:"article", component:ArticleComponent},
  {path:"category", component:CategoryComponent},
  {path:"tag", component:TagComponent},
  {path:"singl-article", component:SinglArticleComponent},
  {path:"template", component:TemplateComponent},
  {path:"fill-fields", component:FileFieldsComponent},
  {path:"**", component:Erreur404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
