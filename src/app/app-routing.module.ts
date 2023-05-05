import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FAQComponent } from './faq/faq.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'customer', component: CustomerAccountComponent},
  {path: 'our-mission', component: OurMissionComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'FAQ', component: FAQComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
