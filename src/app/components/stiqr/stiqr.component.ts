import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER, Observable, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { Sticker } from 'src/app/types/sticker';
import { UserProfile } from 'src/app/types/user-profile';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { GeoPoint, Timestamp } from "@angular/fire/firestore"
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StiqrEditComponent } from '../stiqr-edit/stiqr-edit.component';

@Component({
  selector: 'app-stiqr',
  templateUrl: './stiqr.component.html',
  styleUrls: ['./stiqr.component.scss']
})
// export class StiqrComponent implements OnInit{
export class StiqrComponent{

  // Test Stickers
  // localhost:4200/stiqr/XZCxZixNZORTHYdKnWUI
  // localhost:4200/stiqr/sxEcW4ZbfXzCdgl3Scq1
  // localhost:4200/stiqr/vJpSQZmL9nwgAV3bumUb

  // This is the variable that contains the "id" parameter
  id: string;
  sticker$: Observable<Sticker>;
  userProfile$: Observable<UserProfile>
  locationShared: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public db: DbService,
    public auth: AuthService,
    private readonly geolocation$: GeolocationService,
    private matDialog: MatDialog
  ) {
    this.id = this.route.snapshot.params['id'];
    this.sticker$ = this.db.getSticker$(this.id)
    this.userProfile$ = this.sticker$.pipe(
      switchMap((sticker: Sticker) => {
        if (!!sticker) {
          return this.db.getUserProfile$(String(sticker.userId))
        } else {
          return NEVER
        }
      })
    )
  }

  loginRedirectHandler() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot.url }})
  }

  shareLocationHandler(sticker: Sticker): void {
    this.locationShared = true
    this.geolocation$.pipe(take(1)).subscribe((position: GeolocationPosition) => {
      // console.log(position)
      this.db.updateStickerLocation(sticker, {
        geoPoint: new GeoPoint(position.coords.latitude, position.coords.longitude),
        timestamp: new Timestamp(position.timestamp / 1000, 0)
      })
    })
  }

  registerHandler(user: User, sticker: Sticker) {
    const dialogRef = this.matDialog.open(StiqrEditComponent, {data: sticker})
    dialogRef.afterClosed().subscribe((sticker: Sticker | undefined) => {
      if (!sticker) {
        return
      } else if (sticker.name) {
        this.db.connectStickerToUser(String(sticker.id), user.uid, sticker.name)
      }
    })
  }

  // ngOnInit() {
  //   this.id = this.route.snapshot.params['id'];
  // }

  // testFunction() {
  //   console.log(this.id);
  // }

}
