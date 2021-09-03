import { Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenusService } from './system/services/menus.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token:any=''
  user:any={}
  constructor(public menuServ:MenusService,public auth: AuthService){
      this.auth.idTokenClaims$.subscribe(idToken => {
        this.token = idToken?.__raw.split('.',1)[0]
        console.log(this.token)
        localStorage.setItem('token',this.token)
      })
      this.auth.user$.subscribe(res => {
        this.user = res
        if (this.user){
          localStorage.setItem('name',this.user.name)
          localStorage.setItem('id',this.user.sub)
        }
      })
  }

  name = 'Jquery Integration With Angular!';  
  isJqueryWorking: any;  
  ngOnInit()  
  {  
    
  }  

}
