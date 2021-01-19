import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserdataService } from '../userdata.service';
// import { user } from './login'
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  myOwnUser: string;
  subscription: Subscription;
  constructor(private userdataService: UserdataService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  user:string;
  ngOnInit(): void {
    this.user = this.userdataService.getUser();
    this.subscription = this.userdataService.curUser.subscribe(myOwnUser => this.myOwnUser = myOwnUser)
  }

  addActive(){
    $("#signup").addClass("active");
    $("#login").removeClass("active");
  }

  addActiveLogin(){
    $("#login").addClass("active");
    $("#signup").removeClass("active");
  }
}
