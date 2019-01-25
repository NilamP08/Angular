import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private loggedInStatus=false;
  urlgetall="http://localhost:8080/myapi/candidates/";
  urlmail="http://localhost:8080/myapi/sendmail/";
  urllogin="http://localhost:8080/myapi/login/";
  url = "http://localhost:8080/myapi/candidate/";
  urlstate="http://localhost:8080/myapi/states/";
  urlchangePassword="http://localhost:8080/myapi/resetpassword/"
  urluploadimage="http://localhost:8080/myapi/ProfilePicture/";
  private headerOptions: any = {
    'Content-type': 'application/json'
  }
  headers: HttpHeaders;

  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders(this.headerOptions); }


  add(data){  
    return this.http.post<any>(this.url,data);
  }

  getList(){   
      return this.http.get(`${this.urlstate}`) ;
    }

    changePassword(email,password){
      return this.http.post<any>(this.urlchangePassword,{"email":email,"password":password});
    }

    getListcandidate(){
      return this.http.get(`${this.urlgetall}`) ;
    }

    addLogin(data){  
      return this.http.post<any>(this.urllogin,data);
    }

    sendMail(data){
      return this.http.post<any>(this.urlmail,data);
    }

    setLoggedIn(value:boolean){
      this.loggedInStatus=value;
    }

    get isLoggedIn(){
      return this.loggedInStatus;
    }
    
    public uploadImage(image:File){
      const formData=new FormData();
      formData.append('pic',image);
      return this.http.post( this.urluploadimage,formData);
    }

}
