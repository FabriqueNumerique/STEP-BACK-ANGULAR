import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModelService } from 'src/app/system/services/model.service';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
	form = new FormGroup({});
	model: any = {};
	fields: any = []
	isAddClicked : boolean = false
	isChecked : boolean = true

	field_name:string = ''
	field_type:string = ''
	input_type:string = ''
	id:any = ""

	constructor(public modelService:ModelService, private http:HttpClient) { }

	ngOnInit(): void {
		const article = this.modelService.models.find(model => model.title === 'article')
		console.log("article ",article);
		this.fields = article?.fields
		this.id = article?.id
		console.log("fields ",this.fields)
		console.log("IDDDDD ",this.id)
	}

	submit(){

	}

	addField(){
		this.isAddClicked=true	
	}

	saveField(){
		let item = {}
		if (this.field_type === 'textarea') {
			// this.fields.push({
				item = {
					key: this.field_name,
					type: this.input_type,
					templateOptions: {
						label: this.field_name,
						placeholder: this.field_name,
						required: this.isChecked,
						rows: 10,				
					}
				}
			// })
		}
		else {
			// this.fields.push({
				item = {
					key: this.field_name,
					type: this.input_type,
					templateOptions: {
						label: this.field_name,
						placeholder: this.field_name,
						required: this.isChecked,
						type:this.field_type,
					}
				}
			// })
		}
		this.http.patch(`${environment.url}/modify-model`,item,{params:{id:this.id}})
		.subscribe(res => console.log(res))
		console.log("fields array is ",item)
		this.field_name=""
		this.field_type=""
	}

}
