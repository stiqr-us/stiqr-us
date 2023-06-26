import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth'
import { UserProfile } from './user-profile';
import { Sticker } from './sticker';
import { StickerLocation } from './sticker-location';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private firestore: Firestore = inject(Firestore);
  userProfilesCollection: CollectionReference;
  stickersCollection: CollectionReference;

  constructor() {
    this.userProfilesCollection = collection(this.firestore, 'users')
    // this.userProfiles$ = collectionData(this.userProfilesCollection, {idField: 'id'}) as Observable<UserProfile[]>;

    this.stickersCollection = collection(this.firestore, 'stickers')
    // this.stickers$ = collectionData(this.stickersCollection, {idField: 'id'}) as Observable<Sticker[]>;
  }

  initializeUser(user: User): void {
    this.checkUserProfileExists$(user.uid).subscribe((exists: boolean) => {
      if (!exists) {
        this.addUserProfile({
          id: user.uid,

          name: String(user.displayName),
          shareNameAlways: true,

          email: user.email,
          shareEmailAlways: true,

          number: user.phoneNumber,
          shareNumberAlways: true,

          link: null,
          shareLinkAlways: true,
        })
      }
    })
  }

  addUserProfile(user: UserProfile): void {
    delete user.admin;
    setDoc(doc(this.userProfilesCollection, user.id), user);
  }

  getUserProfile$(userId: string): Observable<UserProfile> {
    return docData(doc(this.userProfilesCollection, userId), {idField: 'id'}) as Observable<UserProfile>;
  }

  checkUserProfileExists$(userId: string): Observable<boolean> {
    return this.getUserProfile$(userId).pipe(switchMap((userProfile: UserProfile) => {
      if (userProfile) {
        return of(true);
      } else {
        return of(false);
      }
    }))
  }

  updateUserProfile(userId: string, field: string, fieldValue: string | null | boolean): void {
    if (fieldValue == "") {
      let fieldValue = null
    } else if (field == "name" && fieldValue == "") {
      // TODO: Tell user they can't have null values
      alert('Name can\'t be empty')
      return
    };
    updateDoc(doc(this.userProfilesCollection, userId), field, fieldValue);
  }

  addSticker(sticker: Sticker) {
    addDoc(this.stickersCollection, sticker)
  }

  // async getStickersForUser(userId: string): Promise<Sticker[]> {
    // let stickers: Sticker[] = [];
    // (await getDocs(query(this.stickersCollection, where("userId", "==", userId)))).docs.forEach(doc => {
    //   stickers.push(doc.data() as Sticker)
    // })
    // return stickers
  // }

  getStickersForUser$(userId: string): Observable<Sticker[]> {
    return collectionData(query(this.stickersCollection, where("userId", "==", userId)), {idField: 'id'}) as Observable<Sticker[]>
  }

  // async getStickersNotPrinted(): Promise<Sticker[]> {
  //   let stickers: Sticker[] = [];
  //   (await getDocs(query(this.stickersCollection, where("printed", "==", false)))).docs.forEach(doc => {
  //     stickers.push(doc.data() as Sticker)
  //   })
  //   return stickers
  // }

  getStickersNotPrinted$(): Observable<Sticker[]> {
    return collectionData(query(this.stickersCollection, where("printed", "==", false)), {idField: 'id'}) as Observable<Sticker[]>
  }

  updateSticker(stickerId: string, field: string, fieldValue: string | boolean): void {
    updateDoc(doc(this.stickersCollection, stickerId), field, fieldValue)
  }

  updateStickerLocation(sticker: Sticker, location: StickerLocation): void {
    // deep copy to ensure proper updating
    let locations = Object.assign([], sticker.locations)
    locations.push(location)
    updateDoc(doc(this.stickersCollection, sticker.id), { locations: locations })
  }
}
