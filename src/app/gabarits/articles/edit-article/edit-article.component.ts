import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/system/services/data.service';

import { FormGroup,  FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

	config: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: '15rem',
		minHeight: '5rem',
		placeholder: 'Enter text here...',
		translate: 'no',
		showToolbar: true,
		enableToolbar: true,
		defaultParagraphSeparator: 'p',
		defaultFontName: 'Arial',
		sanitize: true,
		toolbarHiddenButtons: [
			['bold', 'italic'],
			['fontSize']
		  ],
		customClasses: [
		  {
			name: "quote",
			class: "quote",
		  },
		  {
			name: 'redText',
			class: 'redText'
		  },
		  {
			name: "titleText",
			class: "titleText",
			tag: "h1",
		  },
		]
	  };

	article:any={}
	articles:any = []

	form:any = FormGroup
	id:string = ''
	category:string = ""
	tag:string = ""
	savedTags = []
	categories:any = []
	savedCategories = []
	tags:any = []
	msg = {
		text:"",
		class:""
	}
	top = ""
	displayAlert:boolean=false
	deleteAlert: boolean = false;
	template:string=''

	file:any
	blob:any
	extension:string=''

	title:string=''
	content:string=''
	image:string = ''
	isDeleteImage:boolean = false

  	constructor(
		private route:ActivatedRoute,
		private dataService:DataService,
		private formBuilder:FormBuilder,
		private http:HttpClient,
		private router:Router,
		) { }

	ngOnInit(): void {   
		this.id = this.route.snapshot.queryParams.id
		this.initForm()
		this.findArticle()
		this.dataService.getCategory().subscribe(res => this.categories = res)
		this.dataService.getTag().subscribe(res => this.tags = res)
  	}

	findArticle(){		
		this.dataService.getArticle()
		.subscribe((res:any) => {
			this.articles = res
			this.article = this.articles.find((article:any) => article.id === this.id)
			this.savedCategories = this.article.category
			this.savedTags = this.article.tag
			this.title = this.article.title
			this.content = this.article.content
		})
	}

	initForm(){
		this.form=this.formBuilder.group({
			title:['', Validators.required],
			content:['',Validators.required],
			category:[''],
			tag:[''],
			published:[false,Validators.required],
			image:['']
		})
	}

	ConvertToBlob(event:any){
		this.file = event.target.files[0]
		console.log(this.file)
		if (this.file){
		  	this.file.arrayBuffer().then((arrayBuffer:any) => {
				this.blob = new Blob([new Uint8Array(arrayBuffer)], {type:  this.file.type });
				this.extension = this.blob.type.split('/').pop()
				this.image = this.id + '.' + this.extension
		  	})
		}
	}

	submit(event:MouseEvent){	
		this.form.value.title = this.title
		this.form.value.content = this.content
		this.form.value.id = this.id
		this.form.value.authorId = localStorage.getItem('id')
		this.form.value.updateDate = new Date().toISOString()
		this.form.value.template = this.template
		
		if (this.extension != '') this.form.value.image = this.id+'.'+this.extension
		else this.form.value.image = this.article.image
		
		const params = this.form.value
		console.log(params);
		if (this.form.status === 'VALID') {
			this.http.patch(`${environment.url_component}/article/update-article`,
			this.blob,{params})
			.subscribe((res:any)=>{
				console.log(res)
				this.findArticle()
				this.displayAlert = true
				this.msg.text = res
				this.msg.class = "step-green"
				this.showAlert()
				this.top = (event.clientY+20).toString()+"px"
				this.file=''
				
			})
		}
		else {
			this.displayAlert = true
			this.msg.text = 'This form is invalid !!!'
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

	deleteImage(event:MouseEvent){
		this.deleteAlert = true
		this.isDeleteImage = true
		this.msg.text = `Etes-vous sûrs de supprimer l'image?`
		this.msg.class = "step-yellow"
		this.showAlert()
		this.top = (event.clientY).toString()+"px"
	}

	confirmDeleteImage(event:MouseEvent){
		this.isDeleteImage = false
		this.http.delete(`${environment.url_component}/article/delete-image`,{params:{id:this.id,image:this.article.image}})
		.subscribe((res:any) => {
			console.log(res);
			this.msg.text = res
			this.msg.class = "step-orange"
			this.showAlert()
			this.top = (event.clientY).toString()+"px"
			this.findArticle()
		})
	}

	addImage(event:MouseEvent){
		this.http.post(`${environment.url_component}/article/update-image`,this.blob,
		{
			params:{
				id:this.id,
				image:this.image,
				oldImage:this.article.image
			}
		})
		.subscribe((res:any) =>{
			console.log(res);
			this.findArticle()
			this.file = ''
			this.deleteAlert = true
			this.msg.text = res
			this.msg.class = "step-green"
			this.showAlert()
			this.top = (event.clientY).toString()+"px"
		})
	}

	displayArticle(){
		// this.router.navigate(["articles/single-article"],{queryParams:{id:this.article.id}})		
		this.router.navigate([`templates/${this.article.template}`],{queryParams:{id:this.id}})
	}

}
