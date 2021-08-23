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

  constructor(public modelService:ModelService, private http:HttpClient) { }

  ngOnInit(): void {
    const article = this.modelService.models.find(model => model.title === 'article')
    this.fields = article?.fields
    console.log(this.fields)
  }

  submit(){

  }

  addField(){
    console.log("hi");
    
    this.isAddClicked = true
  }

}
