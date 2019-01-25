
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http:HttpClient) { }

  public uploadImage(image:File){
    const formData=new FormData();
    formData.append('photo',image);
    return this.http.post('http://localhost:8080/myapi/ProfilePicture/',formData);
  }
}
