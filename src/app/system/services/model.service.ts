import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { model } from '../interfaces/model';





@Injectable({
  providedIn: 'root'
})
export class ModelService {
	models:model[] = []

	constructor(private http:HttpClient) {
		this.getModels()
	 }

	getModels(){
		return this.http.get(`${environment.url}/get-models`)
	}


	getFields(){
		return this.http.get(`${environment.url}/get-models`)
		// return this.models.find(model => model.title === 'article')
		// if (article){
		// 	this.fields = article.fields
		// 	this.id = article.id
		// 	console.log("les fields ",this.fields);
		// }	
	}

	

}
