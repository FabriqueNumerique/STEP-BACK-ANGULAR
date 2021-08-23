import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { field } from '../interfaces/field';
import { model } from '../interfaces/model';





@Injectable({
  providedIn: 'root'
})
export class ModelService {
	models:model[] = []
	fields:field[]=[]

	constructor(private http:HttpClient) {
		this.getModels()
	 }

	getModels(){
		this.http.get(`${environment.url}/get-models`).subscribe((res:any)=>{
			this.models = res
			console.log(this.models);
		})
	}



	

}
