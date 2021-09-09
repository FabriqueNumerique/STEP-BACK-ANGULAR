import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  articles:any = []
  categories:any = []
  tags:any = []
  constructor(private http:HttpClient) {
    this.getArticle()
    this.getCategory()
    this.getTag()
  }

  getArticle(){
		return this.http.get(`${environment.url_component}/article/get-article`)
	}

  getCategory(){
		return this.http.get(`${environment.url_component}/category/get-category`)
	}

  getTag(){
		return this.http.get(`${environment.url_component}/tag/get-tag`)
	}

  getMedia(){
    return this.http.get(`${environment.url}/media/get-media`)
  }
}
