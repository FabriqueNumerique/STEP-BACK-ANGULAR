import { Component, OnInit, Inject } from '@angular/core';
import { ModelService } from 'src/app/system/services/model.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
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
  	constructor(
		public modelService:ModelService,
		public auth: AuthService,
		@Inject(DOCUMENT) public document: Document
		) { }
		

	ngOnInit(): void {
		
		
	}


}
