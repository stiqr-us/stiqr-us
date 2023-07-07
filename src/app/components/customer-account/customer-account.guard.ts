import { Injectable, OnDestroy } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable, Subscription, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { User } from "@angular/fire/auth";

@Injectable()
// export class CustomerAccountGuard implements CanActivate, CanActivateChild, OnDestroy {
export class CustomerAccountGuard implements CanActivate, CanActivateChild {

  // userSub:Subscription;
  // user:User | null = null;

  constructor(public auth:AuthService, private router:Router) {
    // this.userSub = this.auth.user$.subscribe((user) => {
    //   console.log("Subscribing to User");
    //   console.log(user);

    //   this.user = user;
    // })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.user$.pipe(
      switchMap((user) => {
          if(user) {
            console.log("canActivate returns true");
            return of(true)
          } else {
            console.log("canActivate returns false");
            this.router.navigate(['/']);
            return of(false)
          }
        })
      );

    // if (this.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    //   return false;
    // }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.user$.pipe(
      switchMap((user) => {
          if(user) {
            return of(true)
          } else {
            this.router.navigate(['/']);
            return of(false)
          }
        })
      );

    // if (this.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    //   return false;
    // }
  }

  // isAuthenticated():boolean {
  //   console.log("Trying to Authenticate");
  //   console.log(this.user);
  //   if (this.user) {
  //     return true
  //   } else {
  //     return false;
  //   }
  // }

  // ngOnDestroy() {
  //   this.userSub.unsubscribe();
  // }
}
