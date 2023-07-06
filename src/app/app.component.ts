import { Component, OnInit, inject } from '@angular/core';
import { Auth, AuthProvider, createUserWithEmailAndPassword, GoogleAuthProvider, User, signInWithPopup, signOut, user, signInWithEmailAndPassword, FacebookAuthProvider } from '@angular/fire/auth';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stiqr-us';

  constructor(public auth: AuthService) {}
}
