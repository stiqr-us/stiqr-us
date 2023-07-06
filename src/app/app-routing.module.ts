import { NgModule, OnDestroy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FAQComponent } from './faq/faq.component';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthGuardService } from './services/routing-guard.service';
import { AuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'customer', canActivate: [AuthGuardService], component: CustomerAccountComponent},
  {path: 'our-mission', component: OurMissionComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'FAQ', component: FAQComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnDestroy{

  // userSub:Subscription;
  // user:User | null = null;

  constructor(public auth:AuthService) {
    // this.userSub = this.auth.user$.subscribe((user) => {
    //   this.user = user;

    // })
  }

  // isAuthenticated() {
  //   if (this.user) {

  //   }
  // }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }
}
