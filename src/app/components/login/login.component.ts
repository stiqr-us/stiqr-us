import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:string = '';
  password:string = '';

  userSub:Subscription;
  // user:User | null;

  constructor(public auth: AuthService, private router: Router) {
    this.userSub = this.auth.user$.subscribe((user) => {
      if(user) {
        router.navigate(['/customer']);
      }
      // this.user = user;

    })

  }

  async loginUser(provider:any) {
    this.auth.loginProvider(provider.type);
  }
}
