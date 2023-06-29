import { OnDestroy, inject, Injectable } from '@angular/core';
import { Auth, AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { NEVER, Subscription, switchMap } from 'rxjs';
import { DbService } from './db.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  // signUp_username: string = "";
  // signUp_password: string = "";

  providers = [
    { "name": "Google", "type": new GoogleAuthProvider },
    { "name": "Facebook", "type": new FacebookAuthProvider }
  ];

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  // user: User | null = null;
  userInitializationSubscription: Subscription;

  constructor(
    public db: DbService
  ) {
    this.userInitializationSubscription = this.user$.subscribe((user: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log("aUser:", aUser);
      // this.user = user;
      if (!!user) { this.db.initializeUser(user) }
    })
  }

  // AccountCreated(userPass: string[]) {
  //   this.signUp_username = userPass[0];
  //   this.signUp_password = userPass[1];
  // }

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
    this.userInitializationSubscription.unsubscribe();
  }
}
