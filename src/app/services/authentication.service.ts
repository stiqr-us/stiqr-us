import { OnDestroy, inject, Injectable } from '@angular/core';
import { Auth, AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class authService implements OnDestroy{

  signUp_username: string = "";
  signUp_password: string = "";

  providers = [
    { "name": "Google", "type": new GoogleAuthProvider },
    { "name": "Facebook", "type": new FacebookAuthProvider }
  ];

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  user: User | null = null;
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log("aUser:", aUser);
      this.user = aUser;
    })
  }

  AccountCreated(userPass: string[]) {
    this.signUp_username = userPass[0];
    this.signUp_password = userPass[1];
  }

  async createEmailPassword(email: string, password: string) {
    console.log("create")
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  async loginEmailPassword(email: string, password: string) {
    console.log("login password");
    return await signInWithEmailAndPassword(this.auth, email, password)
  }
  async loginProvider(provider: AuthProvider) {
    console.log("login provider");
    return await signInWithPopup(this.auth, provider)
  }

  async logout() {
    console.log("logout");
    return await signOut(this.auth)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}