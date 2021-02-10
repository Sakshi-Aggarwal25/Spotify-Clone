import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

import { PasswordValidator } from '../shared/password.validator';
import { UserService } from '../user.service';
import { User } from './user';
declare var $ : any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userModel = new User('', '' , 0 , '', '' );
  constructor(private enrollmentService: EnrollmentService, public userService : UserService) { }

  ngOnInit(): void {
  }
  
  load(){
    const user = {
      "name": this.userModel.name,
      "email": this.userModel.email,
      "password": this.userModel.password,
      "confirmPassword": this.userModel.confirmPassword,
      "phone": this.userModel.phone
  }
    this.userService.addUser(user).subscribe(
      response => {
        console.log("hey my new user", response);
      }, error => {
        console.log(error);
      }
    );
  }
}