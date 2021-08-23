import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/system/services/model.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public modelService:ModelService) { }

  ngOnInit(): void {
  }

}
