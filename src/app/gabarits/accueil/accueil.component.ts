import { Component, OnInit } from '@angular/core';



@Component({
	selector: 'app-accueil',
	templateUrl: './accueil.component.html',
	styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {


	token:any= ''
	name:any=''
	constructor() { 
		
	}

  	ngOnInit(): void {
		  this.token = localStorage.getItem('token')
		  this.name = localStorage.getItem('name')
		  
	}

}
