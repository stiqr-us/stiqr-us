import { Injectable, OnDestroy } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "./services/auth.service";
import { User } from "@angular/fire/auth";

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {

  userSub:Subscription;
  user:User | null = null;

  constructor(public auth:AuthService) {
    this.userSub = this.auth.user$.subscribe((user) => {
      this.user = user;

    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }

  isAuthenticated():boolean {
    if (this.user) {
      return true
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
