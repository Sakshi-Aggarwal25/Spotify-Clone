import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClient: HttpClient) { }
  getUser(user: { name: string; password: string; }): Observable<any>{
    return this.httpClient.get('http://localhost:3001/login', { params: { name:user.name,password:user.password }});
    // this.http.get(url, { params: { user:user } });
  }
   
  addUser(user: { name: string; email: string; password: string; confirmPassword: string; phone: number; }): Observable<any>{
    return this.httpClient.post('http://localhost:3001/signup' , user);
  }
}
