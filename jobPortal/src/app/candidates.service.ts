import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  url = "http://localhost:8080/myapi/candidate";
  urlstate="http://localhost:8080/myapi/states";
  urlgetall="http://localhost:8080/myapi/candidates";

  constructor(private http:HttpClient) { }
  add(data){
    return this.http.post<any>(this.url,data).subscribe(res=>console.log("data added"));
  }

  getList() 
    {
      return this.http.get(`${this.urlstate}`) ;
    }

    getListcandidate() 
    {
      return this.http.get(`${this.urlgetall}`) ;
    }

  
}
