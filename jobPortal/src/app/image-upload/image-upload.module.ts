import { ImageUploadService } from './image-upload.service';
import { ImageUploadComponent } from './image-upload.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HttpModule} from '@angular/http';

@NgModule({
  imports:[CommonModule,FormsModule,HttpModule],
  providers:[ImageUploadService],
  exports:[ImageUploadComponent],
  declarations: [ ImageUploadComponent]
  
})
export class ImageUploadModule { }
