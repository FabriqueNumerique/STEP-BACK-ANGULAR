import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  template:any
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  fillFields(){
    this.router.navigate(['articles/fill-fields'],{queryParams:{template:this.template}})
  }
}
