import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/system/services/data.service';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-file-fields',
  templateUrl: './file-fields.component.html',
  styleUrls: ['./file-fields.component.css']
})
export class FileFieldsComponent implements OnInit {

	form:any = FormGroup
	id:string = ''
	category:string = ""
	tag:string = ""
	categories:any = []
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

	constructor(
		private route:ActivatedRoute,
		private dataService:DataService,
		private formBuilder:FormBuilder,
		private http:HttpClient,
		private router:Router
		) { }

	ngOnInit(): void {
		this.template = this.route.snapshot.queryParams.template
		console.log(this.template);
		this.dataService.getCategory().subscribe(res => this.categories = res)
		this.dataService.getTag().subscribe(res => this.tags = res)
		this.initForm()
		
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
		  	})
		}	
	}
	
	submit(event:MouseEvent){	
		const id = uuid()
		this.form.value.id = id
		this.form.value.authorId = localStorage.getItem('id')
		this.form.value.date = new Date().toISOString()
		this.form.value.template = this.template
		if (this.extension != ""){
			this.form.value.image = id+'.'+this.extension
		}
		const params = this.form.value
		console.log(params);
		if (this.form.status === 'VALID') {
			this.http.post(`${environment.url_component}/article/add-article`,
			this.blob,{params})
			.subscribe((res:any)=>{
				this.router.navigate(['articles/article'],{queryParams:{text:'Un article a été ajouté!!!'}})
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
	
}
