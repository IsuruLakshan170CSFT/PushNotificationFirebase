import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpHeaders = new HttpHeaders().set('content-type', 'application/json');

  readonly baseURL ='https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com';
 //  readonly baseURL ='http://127.0.0.1:3000';
  // readonly baseURL ='http://localhost:3000';

  constructor(private http:HttpClient) { }


  postNotification(data: any): Observable<any> {
    console.log("Post notification");
    console.log(data);
    return this.http.post(`${this.baseURL}/send`, data);
  }

  //new updates
  postUser(data: any): Observable<any> {
    console.log("Post User Data");
    console.log(data);
    return this.http.post(`${this.baseURL}/add_user`, data);
  }

  postRemoveUser(data: any): Observable<any> {
    console.log("Remove User Data");
    console.log(data);
    return this.http.post(`${this.baseURL}/delete`, data);
  }
  

 // get all users
 getAllUsers(): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });

  console.log("get Users");
  return this.http.get(`${this.baseURL}/getAllUsers`)

}

}
