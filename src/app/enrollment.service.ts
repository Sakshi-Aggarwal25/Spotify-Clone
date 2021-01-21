import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './sign-up/user';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  url = '';

  constructor(private _http: HttpClient) { }

  enroll(user: User){
    return this._http.post<any>(this.url, user);
  }
}