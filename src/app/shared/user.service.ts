import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';
import {Device} from './user.model';
import {User} from './assets'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  selectedUser? :Device;
  users ?:Device[];
  //
  httpHeaders = new HttpHeaders().set('content-type', 'application/json');

  readonly baseURL ='https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com';
//  readonly baseURL ='http://127.0.0.1:3000';

  constructor(private http:HttpClient) { }

  // get all users
  getUser(): Observable<any> {
    const httpHeaders= new HttpHeaders({
      'content-type' :'application/json',
    });

    console.log("get Users");
    return this.http.get(`${this.baseURL}/getAll`)

 }


   // get one user
   getUserOne(data: any): Observable<any> {

    console.log("get one data");
      return this.http.get<any>(`${this.baseURL}/getOne`,data)
  
 }

  postUser(data: any): Observable<any> {
    console.log("Post Data");
    console.log(data);
    return this.http.post(`${this.baseURL}/addOne`, data);
  }
  
  postNotification(data: any): Observable<any> {
    console.log("Post notification");
    console.log(data);
    return this.http.post(`${this.baseURL}/send`, data);
  }

  




}
