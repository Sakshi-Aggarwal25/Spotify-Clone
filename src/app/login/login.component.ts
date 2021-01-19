import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PasswordValidator } from '../shared/password.validator';
import { forbiddenNameValidator } from '../shared/user-name.validator';
import { UserdataService } from '../userdata.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  myUser : any;
  myOwnUser: string;
  subscription: Subscription;
  get userName(){
    this.myUser = this.loginForm.get('userName');
    return this.loginForm.get('userName');
  }

  constructor(private fb: FormBuilder, private userdataService: UserdataService) { }
  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
      // ,
      // address:this.fb.group ({ 
      //   city: [''],
      //   state: [''],
      //   postalCode: ['']
      // })
  }, {validator: PasswordValidator});

  // loginForm = new FormGroup({
  //   userName: new FormControl('Sakshi'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })

  // });

  loadData(){
    this.loginForm.setValue({
      userName: 'Sam',
      password: 'test',
      // confirmPassword: 'test',
      // address: { 
      //   city: 'City',
      //   state: 'State',
      //   postalCode: '123456'
      // }
    })
  }

  loginUser(){
    this.userdataService.setUser(this.myUser.value);
    $("#signup").hide();
    $("#login").hide();
    $("#user").show();
  }

  ngOnInit(): void {
    this.myUser = this.userdataService.getUser();
    this.subscription = this.userdataService.curUser.subscribe(myOwnUser => this.myOwnUser = myOwnUser )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
