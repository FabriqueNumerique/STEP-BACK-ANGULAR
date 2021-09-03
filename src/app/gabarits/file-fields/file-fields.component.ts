import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
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

	// form = new FormGroup({});
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

	constructor(
		private route:ActivatedRoute,
		private dataService:DataService,
		private formBuilder:FormBuilder,
		private http:HttpClient
		) { }

	ngOnInit(): void {
		this.template = this.route.snapshot.queryParams.template
		console.log(this.template);
		this.dataService.getCategory().subscribe(res => this.categories = res)
		this.dataService.getTag().subscribe(res => this.tags = res)

		this.form=this.formBuilder.group({
			title:['', Validators.required],
			content:['',Validators.required],
			category:[''],
			tag:[''],
			published:[false,Validators.required],
			image:['']
		})
	}


	submit(event:MouseEvent){	
		this.form.value.id = uuid()
		this.form.value.authorId = localStorage.getItem('id')
		this.form.value.date = new Date().toISOString()
		this.form.value.template = this.template
		console.log(this.form.value);
		this.http.post(`${environment.url_component}/article/add-article`,this.form.value)
		.subscribe((res:any)=>{
		console.log(res);
		this.displayAlert = true
			this.msg.text = res
			this.msg.class = "step-green"
			this.showAlert()
			this.top = (event.clientY+20).toString()+"px"
		})
		
		this.form.reset();
	}

	showAlert(){
		this.displayAlert = true;
	}

	closeAlert(){
		this.displayAlert = false;
	}
	
}
