import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  email:string = "";
  password:string = "";
  passwordCheck:string = "";

  hadError:boolean = false;
  errorMessage:string = "";

  promiseObject:any;

  constructor(public auth: AuthService) { }

  createAccount() {
    if(this.password == this.passwordCheck) {
      this.promiseObject = this.auth.createEmailPassword(this.email, this.password).then(
        (response)=> {
          console.log("Account Created Successfully");
          console.log(response);
      }).catch(
        (error) => {
          console.log("There was an error creating an account");
          console.log(error);
      });
    } else {
      this.hadError = true;
      this.errorMessage = "Your passwords didn't match up. Make sure you do them the same.";
    }
  }

}
