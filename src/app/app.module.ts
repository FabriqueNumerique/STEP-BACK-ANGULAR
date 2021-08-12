import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BlogComponent } from './gabarits/blog/blog.component';
import { ArticleComponent } from './gabarits/article/article.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
import { AccueilComponent } from './gabarits/accueil/accueil.component';
import { ContactComponent } from './gabarits/contact/contact.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
