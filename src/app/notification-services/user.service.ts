import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpHeaders = new HttpHeaders().set('content-type', 'application/json');

 // readonly baseURL ='https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com';
  readonly baseURL ='http://127.0.0.1:3000';
  // readonly baseURL ='http://localhost:3000';

  constructor(private http:HttpClient) { }

  //send and save notifications
  postNotification(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.baseURL}/addNotification`, data);
  }

  //add user
  postUser(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/addUser`, data);
  }

  //remove user
  postRemoveUser(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/deleteUser`, data);
  }

 // get all users
 getAllUsers(): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllUsers`)
}

 // get all userstest
 getAllUserstest(params?: any): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllUsers`,{params:params})
}

 // get all users length
 getAllUsersLength(): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllUsersLength`)
}


// get all notifications
getAllNotifications(): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllNotifications`)
  }


  getCustomers(params?: any) {
    let  apiUrl = 'https://www.primefaces.org/data/customers'
    return this.http.get<any>(apiUrl, {params: params}).toPromise();
  }

  // get all notifications
getAllNotificationstest(params?: any): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllNotifications`,{params:params})
  }

  // get all notification length
  getAllNotificationsLength(): Observable<any> {
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllNotificationsLength`)
  }

}
