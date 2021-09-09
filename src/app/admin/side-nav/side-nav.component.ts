import { Component, OnInit, Inject } from '@angular/core';
import { ModelService } from 'src/app/system/services/model.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
  
})
export class SideNavComponent implements OnInit {
  	rightMenus = [
		{
			title:'Type de contenu',
			link:'model',
			icon:'dashboard'
		},
		{
			title:'Menu',
			link:'user',
			icon:'list'
		},
		{
			title:'Media',
			link:'media',
			icon:'perm_media'
		},
		{
			title:'User',
			link:'user',
			icon:'person'
		},
		
		{
			title:'Paramètres',
			link:'user',
			icon:'tune'
		},
  	]

	left = ''

	mobilMenu = [
		{
			title:"Articles",
			link:"articles/article",
			class:"active"
		},
		{
			title:"Carousels",
			link:"accueil",
			class:"active"
		},
		{
			title:"Geolocalisation",
			link:"accueil",
			class:"active"
		},
		{
			title:"Another component",
			link:"accueil",
			class:"active"
		},
		{
			title:"Categories",
			link:"articles/category",
			class:"active"
		},
		{
			title:"Tags",
			link:"articles/tag",
			class:"active"
		},
	]

	
	leftMenu = [
		{
			category:"Contents",
			ul:[
				{
					title:"Articles",
					link:"articles/article",
					icon:"",
					class:"active"
				},
				{
					title:"Carousels",
					link:"accueil",
					icon:"",
					class:"active"
				},
			]
		},
		{
			category:"Custom Components",
			ul:[
				{
					title:"Geolocalisation",
					link:"accueil",
					icon:"",
					class:"active"
				},
				{
					title:"Another component",
					link:"accueil",
					icon:"",
					class:"active"
				},
			]
		},
		{
			category:"MetaData",
			ul:[
				{
					title:"Categories",
					link:"articles/category",
					icon:"",
					class:"active"
				},
				{
					title:"Tags",
					link:"articles/tag",
					icon:"",
					class:"active"
				},
			]
		},

	]

	innerWidth:number=window.innerWidth

  	constructor(
		public modelService:ModelService,
		public auth: AuthService,
		@Inject(DOCUMENT) public document: Document
		) { }
		

	ngOnInit(): void {
		console.log(window.innerWidth)
		
	}

	mobileMenu() {
		const hamburger = document.querySelector(".hamburger");
		const navMenu = document.querySelector(".nav-menu-ang");
		hamburger?.classList.toggle("active");
		navMenu?.classList.toggle("active");
	}
	
	
	closeMenu() {
		const hamburger = document.querySelector(".hamburger");
		const navMenu = document.querySelector(".nav-menu-ang");
		hamburger?.classList.remove("active");
		navMenu?.classList.remove("active");
	}

	onResize(event:any) {
		
		this.innerWidth = event.target.innerWidth;
		console.log(this.innerWidth);
	}

}
