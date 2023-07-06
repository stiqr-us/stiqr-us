import { NgModule, OnDestroy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomerAccountComponent } from './components/customer-account/customer-account.component';
import { OurMissionComponent } from './components/our-mission/our-mission.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FAQComponent } from './components/faq/faq.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/routing-guard.service';
import { StiqrComponent } from './components/stiqr/stiqr.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'customer', canActivate: [AuthGuardService], component: CustomerAccountComponent},
  {path: 'our-mission', component: OurMissionComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'FAQ', component: FAQComponent},
  {path: 'stiqr/:id', component: StiqrComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

  constructor(public auth:AuthService) {}
}
