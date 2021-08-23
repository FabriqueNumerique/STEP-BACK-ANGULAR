import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModelService } from 'src/app/system/services/model.service';
import { MenusService } from 'src/app/system/services/menus.service';
import { field } from 'src/app/system/interfaces/field';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
	hideRequiredControl = new FormControl(false);
	isAdd:boolean=true
	isChecked:boolean=true
	isValidate:boolean=false
	isSelected:boolean = true
	selected_component:string="false"

	fields:field[]=[]
	name_component:string=""
	name_field:string=""
	typeField:string=""
	models :any = []
	options = ['article','category','tag']

	constructor(
		private http:HttpClient, 
		public modelService:ModelService, 
		private menuService:MenusService,
		) { }

	ngOnInit(): void {
		console.log(uuid())	
		this.onSelect()
	}

	onSelect(){
		console.log(this.modelService.models);
		this.modelService.models.map(model => {
			this.models.push(model.title)
			console.log(this.models)
			this.options = this.options.filter(e => !this.models.includes(e))
		})
	}

  	generateInput(event:any){
		this.typeField = event
 	}

	addField(){
		switch (this.typeField) {
			case "text":
			this.fields.push({
				key: 'text',
				type: 'input',
				templateOptions: {
					label: this.name_field,
					placeholder: 'Placeholder',
					required: this.isChecked,
					type:'text'				
				}
			})
			break;
			case "email":
			this.fields.push({
				key: 'email',
				type: 'input',
				templateOptions: {
					label: this.name_field,
					placeholder: 'Placeholder',
					required: this.isChecked,
					type:'email'				
				}
			})
			break;
			case "number":
			this.fields.push({
				key: 'number',
				type: 'input',
				templateOptions: {
					label: this.name_field,
					placeholder: 'Placeholder',
					required: this.isChecked,
					type:'number'				
				}
			})
			break;
			case "date":
			this.fields.push({
				key: 'date',
				type: 'input',
				templateOptions: {
					label: this.name_field,
					placeholder: 'Placeholder',
					required: this.isChecked,
					type:'date'				
				}
			})
			break;
			case "file":
			this.fields.push({
				key: 'file',
				type: 'input',
				templateOptions: {
					label: this.name_field,
					placeholder: 'Placeholder',
					required: this.isChecked,
					type:'file'				
				}
			})
			break;

			case "textarea":
			this.fields.push({
				key: 'textarea',
				type: 'textarea',
				templateOptions: {
					label: this.name_field,
					placeholder: 'Placeholder',
					required: this.isChecked,
				  	rows: 10,
					type:'textarea'
				}
			  })
			
		}
		console.log(this.fields)
		this.isValidate = true
		this.isSelected = false
		this.name_field=""
		this.typeField=""
	}

	saveModel(){
		const bodyModel ={
			id:uuid(),
			title:this.name_component,
			fields:this.fields
		}
		console.log(bodyModel)
		this.http.post(`${environment.url}/add-model`, bodyModel)
		.subscribe(res => {
			console.log(res)
			this.modelService.getModels()
			const bodyRoute ={
				id:uuid(),
				route:{"path":this.name_component, "component":`${this.name_component}Component`}
			}
			this.http.post(`${environment.url}/add-menu-principal`, bodyRoute)
			.subscribe(res => {
				console.log(res)
				this.menuService.getRoutes()
				this.onSelect()
			})
			this.name_component=""
		})
		this.isSelected = true
	}

	

	addAnotherField(){
		this.isValidate = false
	}

	deleteChamp(index:number){
		console.log(index);
		this.fields.splice(index, 1);
		
	}

	cancel(){
		this.isSelected = true
		this.isValidate = false
		this.name_component=""
		this.fields=[]
	}

}
