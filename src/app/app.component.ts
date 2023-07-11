import { Component, OnInit, inject } from '@angular/core';
import { Auth, AuthProvider, createUserWithEmailAndPassword, GoogleAuthProvider, User, signInWithPopup, signOut, user, signInWithEmailAndPassword, FacebookAuthProvider } from '@angular/fire/auth';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stiqr-us';

  // When the testing environment of dev is deployed, use url below.
  // https://stiqr-dev.web.app

  name:string = '';

  logoutModalDisplay:boolean = false;

  constructor(public auth: AuthService, public router:Router) {
    this.auth.user$.subscribe((user) => {
      console.log(user);
    })
  }
  logoutModal(){
    this.logoutModalDisplay = true;
  }
  confirmedLogout(){
    this.logoutModalDisplay = false
    this.auth.logout()
  }
}
