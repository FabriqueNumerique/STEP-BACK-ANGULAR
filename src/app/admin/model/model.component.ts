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
	panelOpenState = false;
	hideRequiredControl = new FormControl(false);
	isChecked:boolean=true
	isValidate:boolean=false
	isSelected:boolean = true
	fields:field[]=[]
	name_component:string=""
	name_field:string=""
	field_type:string=""
	input_type:string=""
	rows:number = 0
	models :any = []
	options = ['article','category','tag']
	id:string = ''
	

	constructor(
		private http:HttpClient, 
		public modelService:ModelService, 
		private menuService:MenusService,
		) { }

	ngOnInit(): void {
		this.onSelect()
	}

	onSelect(){
		let modelDispo:any = []
		this.modelService.getModels()
		this.modelService.models.map(model => {
			modelDispo.push(model.title)
			
		})
		this.options = ['article','category','tag']
		this.options = this.options.filter(e => !modelDispo.includes(e))
		this.menuService.getRoutes()
		this.modelService.getModels()
		this.models =  this.modelService.models
		
	}

  	generateInput(input_type:string,field_type:string){
		this.input_type = input_type
		this.field_type = field_type
		if (input_type === "textarea") this.rows = 10
 	}

	addField(){
		let id_field = uuid()
		if (this.name_component != 'article'){
			this.name_field = 'name'
			this.field_type ='text'
			this.input_type = 'input'
		}
		this.fields.push({
			id:id_field,
			key: this.name_field,
			type: this.input_type,
			templateOptions: {
				label: this.name_field,
				placeholder: this.name_field,
				required: this.isChecked,
				type:this.field_type,
				rows: this.rows,				
			}
		})
		
		console.log("fields array is ",this.fields)
		this.isValidate = true
		this.isSelected = false
		this.name_field=""
		this.field_type=""
	}

	saveModel(){
		if (this.name_component != 'article') this.addField()
		this.id=uuid()
		const bodyModel ={
			id:this.id,
			title:this.name_component,
			fields:this.fields
		}
		this.http.post(`${environment.url}/add-model`, bodyModel)
		.subscribe(res => {
			console.log(res)
			this.onSelect()
			const bodyRoute ={
				id:this.id,
				route:{"path":this.name_component, "component":`${this.name_component}Component`}
			}
			this.http.post(`${environment.url}/add-menu-principal`, bodyRoute)
			.subscribe(res => {
				console.log("name component ",this.name_component)
				this.onSelect()
			})
			this.name_component=""
		})
		this.isSelected = true
		this.isValidate = false
		this.fields = []
	}

	addAnotherField(){
		this.isValidate = false
	}

	deleteChamp(index:number){
		console.log(index);
		this.fields.splice(index, 1);
		console.log(this.fields.length)
	}

	cancel(){
		this.isSelected = true
		this.isValidate = false
		this.name_component=""
		this.name_field=""
		this.field_type=""
		this.fields=[]
	}

	deleteModel(id:string){
		console.log(id);
		this.http.delete(`${environment.url}/delete-model`,{params:{id}})
		.subscribe((res:any)=> {
			console.log(res)
			this.onSelect()
			this.http.delete(`${environment.url}/delete-menu-principal`,{params:{id}})
			.subscribe((res:any)=> {
				console.log(res)
				this.onSelect()
			})
		})
	}

}
