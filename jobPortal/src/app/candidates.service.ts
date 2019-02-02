import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CandidatesService {
  private loggedInStatus = false;
  urlgetall = "http://localhost:8080/myapi/candidates/";
  urlmail = "http://localhost:8080/myapi/sendmail/";
  urllogin = "http://localhost:8080/myapi/login/";
  url = "http://localhost:8080/myapi/candidate/";
  urlstate = "http://localhost:8080/myapi/states/";
  urlchangePassword = "http://localhost:8080/myapi/resetpassword/";
  urluploadimage = "http://localhost:8080/myapi/ProfilePicture/";
  funurl = "http://localhost:8080/myapi/getoneman";
  urlupdate="http://localhost:8080/myapi/update/";
  urlusercheck="http://localhost:8080/myapi/usercheck/";

  private headerOptions: any = {
    "Content-type": "application/json"
  };
  headers: HttpHeaders;

  constructor(private http: HttpClient, private r: Router) {
    this.headers = new HttpHeaders(this.headerOptions);
  }

  update(data){
    return this.http.post<any>(this.urlupdate,data);

  }

  add(data) {
    return this.http.post<any>(this.url, data);
  }

  getList() {
    return this.http.get(`${this.urlstate}`);
  }

  changePassword(email, password) {
    return this.http.post<any>(this.urlchangePassword, {
      email: email,
      password: password
    });
  }

  getListcandidate() {
    return this.http.get(`${this.urlgetall}`);
  }

  addLogin(data) {
    return this.http.post<any>(this.urllogin, data);
  }

  sendMail(data) {
    return this.http.post<any>(this.urlmail, data);
  }

  showinfo(token) {
    return this.http.post(this.funurl, { token: token });
  }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUserToken", token);
  }

  getToken() {
    return localStorage.getItem("LoggedInUserToken");
  }

  checkuser(username){
    return this.http.post(this.urlusercheck,username);

  }
  

  /*
    sendUser(username: string){
      console.log("@@inside service setuser ",username);
      localStorage.setItem("username", username)
    }


    getUser(){
      console.log("@@inside service getuser ");
      return localStorage.getItem("username")
    }

*/

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("LoggedInUserToken");
   // localStorage.removeItem("username");
    this.r.navigateByUrl("home/login");
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append("pic", image);
    return this.http.post(this.urluploadimage, formData);
  }
}
