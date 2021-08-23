import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface model {
	id: string,
	title: string,
	fields: [{}]
}



@Injectable({
  providedIn: 'root'
})
export class ModelService {
	models:model[] = []

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
