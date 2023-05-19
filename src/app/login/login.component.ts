import { Component } from '@angular/core';
import { authService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:string = '';
  password:string = '';

  constructor(public auth:authService) {

  }
}
