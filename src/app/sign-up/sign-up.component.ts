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
  userModel = new User('Name', 'name@test.com' , 9988776655 , '*', '*' );
  constructor(private enrollmentService: EnrollmentService, public userService : UserService) { }

  ngOnInit(): void {
  }
  // user;
  // onSubmit(){
  //   // console.log(this.userModel);
  //   this.enrollmentService.enroll(this.user).subscribe(
  //     data => console.log('Success!', data),
  //     error => console.log('Error!', error)
  //   )
  // }
  load(){
    $("#login").click();
    
    const user = {
      "name": this.userModel.name,
      "email": this.userModel.email,
      "password": this.userModel.password,
      "confirmPassword": this.userModel.confirmPassword,
      "phone": this.userModel.phone
  }
    this.userService.addUser(user).subscribe(
      response => {
        console.log("hey", response);
      }, error => {
        console.log(error);
      }
    );
  }
}
