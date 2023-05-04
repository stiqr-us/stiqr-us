import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stiqr-us';

  currentPage:string = "homepage";

  loginClicked() {
    this.currentPage = "login";
  }
  logoClicked() {
    console.log("here");
    this.currentPage = "homepage";
  }
  signupClicked() {
    this.currentPage = "sign up";
  }
}
