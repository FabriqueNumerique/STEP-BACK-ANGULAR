import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/system/services/data.service';


@Component({
  selector: 'app-singl-article',
  templateUrl: './singl-article.component.html',
  styleUrls: ['./singl-article.component.css']
})
export class SinglArticleComponent implements OnInit {

  article:any={}
  articles:any = []
  constructor(private route:ActivatedRoute, private dataService:DataService) { }

  ngOnInit(): void {   
    let id = this.route.snapshot.queryParams.id
    console.log(id);
    
    this.dataService.getArticle()
    .subscribe((res:any) => {
      this.articles = res
      this.article = this.articles.find((article:any) => article.id === id)
    })
  }
}
