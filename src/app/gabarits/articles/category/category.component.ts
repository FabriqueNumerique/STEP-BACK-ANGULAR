import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModelService } from 'src/app/system/services/model.service';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/app/system/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	panelOpenState = false;
	form = new FormGroup({});
	model:any = {}
	fields: any = []
	isAddClicked : boolean = false
	isChecked : boolean = true

	categories:any = []

	id:string = ""

	msg = {
		text:"",
		class:""
	}

	top = ""

	displayAlert: boolean = false;
	deleteAlert: boolean = false;
  
	constructor(public modelService:ModelService,private http:HttpClient, private dataService:DataService) { }

	ngOnInit(): void {
		const category = this.modelService.models.find(model => model.title === 'category')
		this.fields = category?.fields
		this.getCategory()		
	}

	getCategory(){
		this.dataService.getCategory().subscribe((res:any) => this.categories = res)
	}

	saveCategory(event:MouseEvent){
		this.model.id = uuid()
		this.deleteAlert = false
		const category = this.categories.find((category:any) => category.name === this.model.name)
		if (!category){
			this.http.post(`${environment.url_component}/category/add-category`,this.model)
			.subscribe((res: any) => {
				this.getCategory()
				this.msg.text = res
				this.msg.class = "step-green"
				this.showAlert()
				this.top = (event.clientY+20).toString()+"px"
			})
			this.form.reset();
		}
		else {
			this.msg.text = "Cette catégorie existe déjà !!!"
			this.msg.class = "step-yellow"
			this.showAlert()
			this.top = (event.clientY+20).toString()+"px"
		}
		
	}

	showAlert(){
		this.displayAlert = true;
	}

	closeAlert(){
		this.displayAlert = false;
	}

	deleteCategory(id:string, category:string, event:MouseEvent){
		this.deleteAlert = true
		this.id = id
		this.msg.text = `Etes-vous sûrs de supprimer l'étiquette ${category}?`
		this.msg.class = "step-yellow"
		this.showAlert()
		this.top = (event.clientY+20).toString()+"px"
	}

	confirmDelete(event:MouseEvent){
		this.http.delete(`${environment.url_component}/category/delete-category`,{params:{id:this.id}})
		.subscribe((res:any) => {
			this.getCategory()
			this.deleteAlert = false
			this.msg.text = "Une catégorie a été supprimé !!!"
			this.msg.class = "step-orange"
			this.showAlert()
			this.top = (event.clientY+20).toString()+"px"
		})
	}

}

