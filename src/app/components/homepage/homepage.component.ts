import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  slideIndex:number = 1;

  displaySlideshow1:boolean = false;
  displaySlideshow2:boolean = false;
  displaySlideshow3:boolean = false;

  constructor(private auth:AuthService) {}

  ngOnInit() {
    // I added this because when reloading the customer page, the user is redirected here by the guard Service
    // even though they are logged in.
    // this.auth.logout();

  }

  onImage1Load(){this.displaySlideshow1 = true;}
  onImage2Load(){this.displaySlideshow2 = true;}
  onImage3Load(){this.displaySlideshow3 = true;}

  plusSlides(n:number) {
    if(n == -1 && this.slideIndex == 1) {
      return;
    } else if(n == 1 && this.slideIndex == 3){
      return;
    } else {
      this.slideIndex += n;
    }
  }
  currentSlide(n:number) {
    this.slideIndex = n;
  }

}
