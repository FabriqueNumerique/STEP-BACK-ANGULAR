import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AccueilComponent } from 'src/app/gabarits/accueil/accueil.component';
// import { BlogComponent } from 'src/app/gabarits/blog/blog.component';
// import { ArticleComponent } from '../../gabarits/article/article.component';
// import { ContactComponent } from 'src/app/gabarits/contact/contact.component';
// import { FormsComponent } from 'src/app/admin/forms/forms.component';
// import { Erreur404Component } from 'src/app/structure/erreur404/erreur404.component';
import { Route } from '@angular/compiler/src/core';
import { UserComponent } from 'src/app/admin/user/user.component';
import { ModelComponent } from 'src/app/admin/model/model.component';
import { environment } from 'src/environments/environment';
import { ArticleComponent } from 'src/app/gabarits/article/article.component';
import { CategoryComponent } from 'src/app/gabarits/category/category.component';
import { TagComponent } from 'src/app/gabarits/tag/tag.component';

export interface route {
	id: string,
	route: {}
}

@Injectable({
  providedIn: 'root'
})
export class MenusService {

	menus : any = []
	// routes: any = [];
	routes:route[] = []

	constructor(private http: HttpClient, private router: Router) {
		this.getRoutes();
	}
	
	
	getRoutes(){
		this.http.get(`${environment.url}/get-routes`).subscribe((res:any)=>{
			this.routes = res
			console.log(this.router.config);
			const tmp = this.router.config.pop();
			this.routes.map((route:any) => {
				this.router.config.push(this.setRoutes(route.route))
			})
			this.router.config.push(tmp as Route)
		})
	}
	
	
	// Récupérer les menus
	getMenus() {
		
		// this.http.get('assets/mock/menus.json').subscribe((menus) => {
		// this.menus = menus;
		// console.log(this.menus, this.routes);
		// const tmp = this.router.config.pop();
		// this.menus.forEach((m: any) => {
		// 	this.router.config.push(this.setRoutes(m.route));
		// 	this.routes = this.router.config;
		// });
		// this.router.config.push(tmp as Route);
		// console.log("router", this.router.config);
		// })
	}

	// Modifier la route d'origine pour récupérer les composants
	setRoutes(r: { path: string, component: any, data: any }): Route {
		switch (r.path) {
		case "article":
			r.component = ArticleComponent;
			break;
		case "category":
			r.component = CategoryComponent;
			break;
		case "tag":
			r.component =TagComponent;
			break;
		// case "ContactComponent":
		//   r.component = ContactComponent;
		//   break;
		// case "FormsComponent":
		//   r.component = FormsComponent;
		//   break;
		// default:
		//   r.component = Erreur404Component;
		}
		return r as Route;
	}
}
