import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/system/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  images=[]
  url = environment.url_image
  imageToDelete:any= []
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getMedia().subscribe((res:any) => {
      this.images = res
      console.log(this.images);
      
    })
  }

  addImageToDelete(key:string){    
    console.log(key);
    
    if (this.imageToDelete.find((image:any) => image === key)){
      const index = this.imageToDelete.indexOf(key)
      this.imageToDelete.splice(index,1)
      
    }
    else{
      this.imageToDelete.push(key)
      
    }
    console.log(this.imageToDelete);
    
  }

}
