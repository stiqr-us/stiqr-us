import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthProvider, User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Provider } from 'src/app/types/provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  email:string = '';
  password:string = '';

  // userSub:Subscription;
  loginRedirectSub:Subscription;
  // user:User | null;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.userSub = this.auth.user$.subscribe((user) => {
    //   if (user) {
    //     router.navigate(['/customer']);
    //   }
    //   // this.user = user;

    // })

    this.loginRedirectSub = this.auth.user$.subscribe((user: User | null) => {
      console.log(this.route.snapshot.queryParams)
      if (!!user) {
        this.router.navigate(
          this.route.snapshot.queryParams['returnUrl'] || ['/customer']
        )
      }
    })

  }

  async loginHandler(provider: Provider) {
    this.auth.loginProvider(provider.type);
  }

  ngOnDestroy() {
    this.loginRedirectSub.unsubscribe()
  }
}
