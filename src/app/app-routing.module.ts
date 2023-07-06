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
import { CustomerAccountGuard } from './components/customer-account/customer-account.guard';
import { StiqrComponent } from './components/stiqr/stiqr.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home | stiQR' },
  { path: 'login', component: LoginComponent, title: 'Login | stiQR' },
  // {path: 'signup', component: SignUpComponent},
  { path: 'customer', canActivate: [CustomerAccountGuard], component: CustomerAccountComponent, title: 'Customer | stiQR' },
  { path: 'our-mission', component: OurMissionComponent, title: 'Mission | stiQR' },
  { path: 'contact-us', component: ContactUsComponent, title: 'Contact Us | stiQR' },
  { path: 'FAQ', component: FAQComponent, title: 'FAQ | stiQR' },
  { path: 'stiqr/:id', component: StiqrComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

  constructor(public auth:AuthService) {}
}
