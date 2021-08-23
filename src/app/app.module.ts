import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BlogComponent } from './gabarits/blog/blog.component';
import { ArticleComponent } from './gabarits/article/article.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
import { AccueilComponent } from './gabarits/accueil/accueil.component';
import { ContactComponent } from './gabarits/contact/contact.component';

// import { FormlyMaterialModule } from '@ngx-formly/material';
// import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsComponent } from './admin/forms/forms.component';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from "@angular/flex-layout";

import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModelComponent } from './admin/model/model.component';
import { UserComponent } from './admin/user/user.component';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { CategoryComponent } from './gabarits/category/category.component';
import { TagComponent } from './gabarits/tag/tag.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ArticleComponent,
    Erreur404Component,
    AccueilComponent,
    ContactComponent,
    FormsComponent,
    ModelComponent,
    UserComponent,
    SideNavComponent,
    CategoryComponent,
    TagComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    // FormlyMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormlyBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
