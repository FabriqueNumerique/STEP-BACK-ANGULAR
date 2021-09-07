import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { FileFieldsComponent } from './file-fields/file-fields.component';
import { SinglArticleComponent } from './singl-article/singl-article.component';
import { TagComponent } from './tag/tag.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = 
[
  { path: '', 
  children:
    [
      {path:'article', component:ArticleComponent},
      {path:'category', component:CategoryComponent},
      {path:'tag', component:TagComponent},
      {path:'template', component:TemplateComponent},
      {path:'single-article', component:SinglArticleComponent},
      {path:'fill-fields', component:FileFieldsComponent},
      {path:'edit-article', component:EditArticleComponent},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
