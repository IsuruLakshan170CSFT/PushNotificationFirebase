import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { Header } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpHeaders = new HttpHeaders().set('content-type', 'application/json');

  readonly baseURL ='https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com';
 // readonly baseURL ='http://127.0.0.1:3000';
  // read//only baseURL ='http://localhost:3000';

  constructor(private http:HttpClient) { }

  //send and save notifications
  postNotification(data: any): Observable<any> {
    console.log(data);
<<<<<<< HEAD
    return this.http.post(`${this.baseURL}/addNotification`, data);
=======
    return this.http.post(`${this.baseURL}/send`, data);
>>>>>>> c53582f3a4783a511000e8742b1f62f3c595717c
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
 getAllUsers(params?:any): Observable<any> {
  console.log("params");
  console.log(params);
  const httpHeaders= new HttpHeaders({
    'content-type' :'application/json',
  });
  return this.http.get(`${this.baseURL}/getAllUsersQuery`,{params:params})
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
