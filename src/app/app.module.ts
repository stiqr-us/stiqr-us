import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CustomerAccountComponent } from './components/customer-account/customer-account.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OurMissionComponent } from './components/our-mission/our-mission.component';
import { FAQComponent } from './components/faq/faq.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, initializeFirestore } from '@angular/fire/firestore';
import { StiqrComponent } from './components/stiqr/stiqr.component';
import { CustomerAccountGuard } from './components/customer-account/customer-account.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CustomerAccountComponent,
    LoginComponent,
    SignUpComponent,
    OurMissionComponent,
    FAQComponent,
    ContactUsComponent,
    StiqrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatGridListModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => initializeFirestore(getApp(), {ignoreUndefinedProperties: true}))
  ],
  providers: [CustomerAccountGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
