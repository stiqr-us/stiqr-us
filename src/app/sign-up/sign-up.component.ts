import { Component } from '@angular/core';
import { authService } from '../services/authentication.service';

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

  constructor(public auth:authService){}

  createAccount() {
    if(this.password == this.passwordCheck) {
      this.auth.createEmailPassword(this.email, this.password);
    } else {
      this.hadError = true;
      this.errorMessage = "Your passwords didn't match up. Make sure you do them the same."
    }
  }

}
