import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Router}from '@angular/router'



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
 
  funurl="http://localhost:8080/myapi/getoneman"

  private headerOptions: any = {
    'Content-type': 'application/json'
  }
  headers: HttpHeaders;

  constructor(private http:HttpClient,
    private r:Router) { 
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

    fun(token,username){
      return this.http.post(this.funurl,{"token":token,"username":username});
    }







    sendToken(token: string){
      localStorage.setItem("LoggedInUser", token)
    }


    sendUser(username: string){
      console.log("@@inside service setuser ",username);
      localStorage.setItem("username", username)
    }

    getToken(){
      return localStorage.getItem("LoggedInUser")
    }

    getUser(){
      console.log("@@inside service getuser ");
      return localStorage.getItem("username")
    }







    isLoggednIn(){
      return this.getToken() !== null;
    }
    logout(){
      localStorage.removeItem("LoggedInUser");
      localStorage.removeItem("username");
      this.r.navigate(["Login"]);
    }





    public uploadImage(image:File){
      const formData=new FormData();
      formData.append('pic',image);
      return this.http.post( this.urluploadimage,formData);
    }

}
