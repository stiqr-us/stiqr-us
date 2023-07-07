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

  constructor(public auth: AuthService, public router:Router) {
    this.auth.user$.subscribe((user) => {
      console.log("subscribing checking");
      console.log(user);
    })
  }
}
