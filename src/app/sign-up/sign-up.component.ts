import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

import { PasswordValidator } from '../shared/password.validator';
import { User } from './user';
declare var $ : any;


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  topics = ['English' , 'Hindi' , 'Korean', 'Spanish'];
  userModel = new User('Sam', 'sam@test.com' , 9988776655 , '' , 'premium');
  // constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
  }
  // onSubmit(){
  //   console.log(this.userModel);
  //   this.enrollmentService.enroll(this.userModel).subscribe(
  //     data => console.log('Success!', data),
  //     error => console.log('Error!', error)
  //   )
  // }
  load(){
    $("#login").click();
  }
}
