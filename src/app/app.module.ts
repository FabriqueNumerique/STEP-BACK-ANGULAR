import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BlogComponent } from './gabarits/blog/blog.component';
import { ArticleComponent } from './gabarits/article/article.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
import { AccueilComponent } from './gabarits/accueil/accueil.component';
import { ContactComponent } from './gabarits/contact/contact.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ArticleComponent,
    Erreur404Component,
    AccueilComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
