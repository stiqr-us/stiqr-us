import { Component, OnInit, inject } from '@angular/core';
import { Auth, AuthProvider, GoogleAuthProvider, User, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stiqr-us';

  currentPage: string = "homepage";

  signUp_username: string = "";
  signUp_password: string = "";

  providers = [
    { "name": "Google", "type": new GoogleAuthProvider }
  ]
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log("aUser:", aUser);
    })
  }

  loginClicked() {
    this.currentPage = "login";
  }
  logoClicked() {
    console.log("here");
    this.currentPage = "homepage";
  }
  signupClicked() {
    this.currentPage = "sign up";
  }

  AccountCreated(userPass: string[]) {
    this.signUp_username = userPass[0];
    this.signUp_password = userPass[1];
  }

  async loginEmailPassword(email: string, password: string) {
    console.log("login");
    // return await
  }
  async loginProvider(provider: AuthProvider) {
    console.log("login");
    return await signInWithPopup(this.auth, provider)
  }

  async logout() {
    console.log("logout");
    return await signOut(this.auth)
  }
}
