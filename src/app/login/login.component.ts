import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:string = '';
  password:string = '';

  constructor(public auth: AuthService, private router: Router) {

  }

  async loginUser(provider:any) {
    this.auth.loginProvider(provider.type);
  }
}
