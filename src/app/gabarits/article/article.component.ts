import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModelService } from 'src/app/system/services/model.service';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { DataService } from 'src/app/system/services/data.service';



@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})


export class ArticleComponent implements OnInit {

	panelOpenState = false
	form = new FormGroup({});

	model:any = {}
	fields: any = []
	isAddClicked : boolean = false
	isChecked : boolean = true

	field_name:string = ''
	field_type:string = ''
	id:any = ""
	id_field:any = ""
	index=0
	category:string = ""
	tag:string = ""
	
	categories:any = []
	tags:any = []
	articles:any = []

	displayAlert: boolean = false;
	deleteAlert: boolean = false;

	deleteChamp: boolean = false;
	plus:boolean=false

	msg = {
		text:"",
		class:""
	}

	top = ""

	constructor(
		public modelService:ModelService,
		private http:HttpClient,
		private router:Router,
		private dataService:DataService
		) {
			this.getArticle()
			this.dataService.getCategory().subscribe(res => this.categories = res)
			this.dataService.getTag().subscribe(res => this.tags = res)
			this.getFields()
		}

		
	ngOnInit(): void {
		// this.getFields()
	}

	getFields(){
		let article
		this.modelService.getFields().subscribe((res:any)=>{
			article = res.find((model:any) => model.title === 'article')
			this.fields = article.fields
			this.id = article.id
			console.log("les fields ",this.fields);
		})
	}

	addField(){
		this.isAddClicked=true
		this.plus=true	
	}

	deleteField(id:string,index:number,event:MouseEvent){
		this.id = id
		this.index = index
		
		this.deleteChamp = true
		this.deleteAlert = false
		this.msg.text = `Etes-vous sûrs de supprimer ce champ?`
		this.msg.class = "step-yellow"
		this.showAlert()
		this.top = (event.clientY+20).toString()+"px"
	}

	confirmDeleteField(){
		this.http.patch(`${environment.url}/delete-field`,this.id,{params:{index:this.index}})
		.subscribe((res:any) => {
			this.deleteChamp = false
			this.msg.text = res
			this.msg.class = "step-orange"
			this.showAlert()
			this.getFields()
		})
	}

	minus(){
		this.isAddClicked=false
		this.plus=false	
	}
	saveField(event:MouseEvent){
		let item = {}
		let id_field = uuid()
		if (this.field_type === 'textarea') {
			item = {
				id: id_field,
				key: this.field_name,
				type: this.field_name,
				templateOptions: {
					label: this.field_name,
					placeholder: this.field_name,
					required: this.isChecked,
					rows: 10,				
				}
			}
		}
		else {
			item = {
				id: id_field,
				key: this.field_name,
				type: 'input',
				templateOptions: {
					label: this.field_name,
					placeholder: this.field_name,
					required: this.isChecked,
					type:this.field_type,
				}
			}
		}
		this.http.patch(`${environment.url}/modify-model`,item,{params:{id:this.id}})
		.subscribe((res:any) => {
			console.log(res)
			this.showAlert()
			this.msg.text = res
			this.msg.class = "step-green"
			this.top = (event.clientY+20).toString()+"px"
			this.getFields()
		})
		console.log("fields array is ",item)
		this.field_name=""
		this.field_type=""
		this.plus=false
	}

	getArticle(){
		this.dataService.getArticle().subscribe(res => this.articles = res)
	}
	saveArticle(event:MouseEvent){
		this.model.id = uuid()
		this.model.category=this.category
		this.model.tag = this.tag
		console.log("model is ",this.model)
		this.http.post(`${environment.url_component}/article/add-article`,this.model)
		.subscribe((res:any)=>{
			console.log(res);
			this.getArticle()
			this.msg.text = res
			this.msg.class = "step-green"
			this.showAlert()
			this.top = (event.clientY+20).toString()+"px"
		})
		
		this.form.reset();
	}

	displayArticle(id:string){
		this.router.navigate(["singl-article"],{queryParams:{id:id}})		
	}

	showAlert(){
		this.displayAlert = true;
	}

	closeAlert(){
		this.displayAlert = false;
	}

	confirmDelete(){

	}

	deleteArticle(id:string,title:string,event:MouseEvent){
		this.deleteAlert = true
		this.deleteChamp = false
		console.log(id);
		this.msg.text = `Etes-vous sûrs de supprimer l'article ${title}?`
		this.msg.class = "step-yellow"
		this.showAlert()
		this.top = (event.clientY).toString()+"px"
		console.log(this.top);
	}
}
