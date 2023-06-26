import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { NEVER, Observable, Subscription, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { UserProfile } from '../services/user-profile';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnDestroy {
  // Here's a wireframe idea https://wireframe.cc/f3vxRj

  user: User | null = null;
  // userProfile$: Observable<UserProfile> | undefined;
  userProfile: UserProfile | null = null;
  userProfileSubscription: Subscription;

  constructor(
    public auth: AuthService,
    public db: DbService
  ) {
    this.userProfileSubscription = this.auth.user$.pipe(
      switchMap((user: User | null) => {
        if (user) {
          this.user = user;
          // console.log('logged in');
          // console.log(user);
          return this.db.getUserProfile$(user.uid);
          // this.userProfile$ = this.db.getUserProfile$(user.uid);
          // return this.userProfile$
        } else {
          // console.log('not logged in')
          return NEVER
        }
      })
    ).subscribe((userProfile: UserProfile) => {
      if (userProfile) {
        // console.log('profile exists')
        // console.log(userProfile);
        this.userProfile = userProfile
      } else {
        // console.log('no profile exists')
      }
    })
  }


  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
  }

}
