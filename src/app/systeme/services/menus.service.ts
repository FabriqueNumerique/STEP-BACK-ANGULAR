import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AccueilComponent } from 'src/app/gabarits/accueil/accueil.component';
import { BlogComponent } from 'src/app/gabarits/blog/blog.component';
import { ArticleComponent } from '../../gabarits/article/article.component';
import { ContactComponent } from 'src/app/gabarits/contact/contact.component';
import { Erreur404Component } from 'src/app/structure/erreur404/erreur404.component';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  menus: any = { "principal": [] };
  routes: Array<any> = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getMenus();
  }
  // Récupérer les menus
  getMenus() {
    this.http.get<any>('assets/mock/menus.json').subscribe(menus => {
      this.menus = menus;
      console.log(this.menus.principal, this.routes);
      this.menus.principal.forEach( (m:any) => {
        // this.routes.push(m.route);
        this.router.config.push(this.setRoutes(m.route));
        this.routes = this.router.config;
        // this.router.navigateByUrl('/');
      });
      console.log("router", this.router.config);


    })
  }
  
  // Modifier la route d'origine pour récupérer les composants
  setRoutes(r: { path: string, component: any, data: any }): Route {
    switch (r.component) {
      case "AccueilComponent":
        r.component = AccueilComponent;
        break;
      case "ArticleComponent":
          r.component = ArticleComponent;
          break;
      case "BlogComponent":
        r.component = BlogComponent;
        break;
      case "ContactComponent":
          r.component = ContactComponent;
          break;
      default:
        r.component = Erreur404Component;
    }
    return r as Route;
  }
}
