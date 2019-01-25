import { ImageUploadService } from './image-upload.service';
import { Component, OnInit } from '@angular/core';


class ImageSnippet{
  pending:boolean=false;
  status:string='init';
  constructor(public src:string,public file:File){}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedFile:ImageSnippet;

  constructor(private imageService:ImageUploadService){}

  private onSuccess(){
    this.selectedFile.pending=false;
    this.selectedFile.status='ok';
    console.log("sucess");
  }

  private onError(){
    this.selectedFile.pending=false;
    this.selectedFile.status='fail';
    console.log("fail");
  }

  processFile(imageInput:any){   
    const file:File=imageInput.files[0];
    const reader=new FileReader();
    reader.addEventListener('load',(event:any)=>{      
      this.selectedFile=new ImageSnippet(event.target.result,file);
      this.selectedFile.pending=true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res)=>{
          this.onSuccess();         
        },
        (err)=>{
          this.onError();         
        }
      )
    });
    reader.readAsDataURL(file);
  }

  

}
