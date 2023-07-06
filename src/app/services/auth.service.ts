import { OnDestroy, inject, Injectable } from '@angular/core';
import { Auth, AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { NEVER, Subject, Subscription, of, switchMap, zip } from 'rxjs';
import { DbService } from './db.service';
import { UserProfile } from './user-profile';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  // signUp_username: string = "";
  // signUp_password: string = "";

  providers = [
    { "name": "Google", "type": new GoogleAuthProvider },
    // { "name": "Facebook", "type": new FacebookAuthProvider }
  ];

  private auth: Auth = inject(Auth);
  #user$ = user(this.auth);
  user$ = new Subject<User | null>();
  private userSub: Subscription;
  private userInitSub: Subscription;
  // user:UserCredential|undefined;

  // # Code added by Spencer Birch
  userCheckSub: Subscription
  user:User | null = null;

  constructor(
    public db: DbService, private router: Router
  ) {
    this.userSub = this.#user$.subscribe(this.user$)
    this.userInitSub = this.user$.pipe(
      switchMap((user: User | null) => {
        if (!!user) {
          return zip(of(user), this.db.getUserProfile$(user.uid))
        } else {
          return NEVER
        }
      })
    ).subscribe(([user, userProfile]: [User, UserProfile]) => {
      if (!userProfile) {
        this.db.initUser(user)
      }
    })

    // # Code added by Spencer Birch
    this.userCheckSub = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  async authenticateUser() {

  }

  // AccountCreated(userPass: string[]) {
  //   this.signUp_username = userPass[0];
  //   this.signUp_password = userPass[1];
  // }

  async createEmailPassword(email: string, password: string) {
    // console.log("create")
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  async loginEmailPassword(email: string, password: string) {
    // console.log("login password");
    return await signInWithEmailAndPassword(this.auth, email, password)
  }
  async loginProvider(provider: AuthProvider) {

    // const user = await signInWithPopup(this.auth, provider);
    // if(user && user.user.email) {
    //   this.router.navigate(['/customer']);

    //   console.log(user.user);
    //   console.log("Success");
    // } else {

    //   console.log(user);
    //   console.log("Fail");
    // }

    // console.log("login provider");
    // console.log(await signInWithPopup(this.auth, provider));
    return await signInWithPopup(this.auth, provider);
  }

  async logout() {
    // console.log("logout");
    return await signOut(this.auth)
  }

  ngOnDestroy() {
    this.userInitSub.unsubscribe()
    this.userSub.unsubscribe()
  }
}
