import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private user: string = 'Sakshi';
  private userSource = new BehaviorSubject('default');
  curUser = this.userSource.asObservable();

  constructor() { }
  getUser(){
    return this.user;
  }

  setUser(myOwnUser:string){
    this.userSource.next(myOwnUser);
  }

}
