import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PasswordValidator } from '../shared/password.validator';
import { forbiddenNameValidator } from '../shared/user-name.validator';
import { UserService } from '../user.service';
import { UserdataService } from '../userdata.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  myUser: any;
  myPass: any;
  myOwnUser: string;
  subscription: Subscription;
  get userName() {
    this.myUser = this.loginForm.get('userName');
    return this.loginForm.get('userName');
  }

  get password() {
    this.myUser = this.loginForm.get('password');
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private userdataService: UserdataService,
    public userService: UserService
  ) {}
  loginForm = this.fb.group(
    {
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator],
      ],
      password: ['', [Validators.required, Validators.minLength(5)],],
  
    }
  );
  
  loginUser() {
    const user = {
      "name":this.userName.value,
      "password": this.password.value
  }
    
    this.userService.getUser(user).subscribe(
      response => {
        console.log("hey", response);
      }, error => {
        console.log(error);
      }
    );

    // this.userdataService.setUser(this.myUser.value);
    // $('#signup').hide();
    // $('#login').hide();
    // $('#user').show();
  }

  ngOnInit(): void {
    this.myUser = this.userdataService.getUser();
    this.subscription = this.userdataService.curUser.subscribe(
      (myOwnUser) => (this.myOwnUser = myOwnUser)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
