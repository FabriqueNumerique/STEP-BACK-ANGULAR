import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/system/services/data.service';

@Component({
  selector: 'app-template4',
  templateUrl: './template4.component.html',
  styleUrls: ['./template4.component.css']
})
export class Template4Component implements OnInit {

  article:any={}
  articles:any = []
  id:any = ''
  constructor(private route:ActivatedRoute, private dataService:DataService) { }

  ngOnInit(): void {   
    this.id = this.route.snapshot.queryParams.id
    // if we have route with id we use this method
    // this.route.paramMap.subscribe(params => this.id = params.get('id'))
    // console.log(this.id);
    
    this.dataService.getArticle()
    .subscribe((res:any) => {
      this.articles = res
      this.article = this.articles.find((article:any) => article.id === this.id)
    })
  }

}
