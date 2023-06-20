import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, GeoPoint, Timestamp, addDoc, collection, collectionData, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { UserProfile } from './user-profile';
import { Observable } from 'rxjs';
import { Sticker } from './sticker';
import { StickerLocation } from './sticker-location';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private firestore: Firestore = inject(Firestore);
  // userProfiles$: Observable<UserProfile[]>;
  userProfilesCollection: CollectionReference;

  // stickers$: Observable<Sticker[]>;
  stickersCollection: CollectionReference;

  constructor() {
    this.userProfilesCollection = collection(this.firestore, 'users')
    // this.userProfiles$ = collectionData(this.userProfilesCollection, {idField: 'id'}) as Observable<UserProfile[]>;

    this.stickersCollection = collection(this.firestore, 'stickers')
    // this.stickers$ = collectionData(this.stickersCollection, {idField: 'id'}) as Observable<Sticker[]>;
  }

  addUserProfile(user: UserProfile): void {
    user.admin = false
    setDoc(doc(this.userProfilesCollection, user.id), user)
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    return (await getDoc(doc(this.userProfilesCollection, userId))).data() as UserProfile
  }

  updateUserProfile(user: UserProfile, field: string, fieldValue: string | null | boolean): void {
    if (fieldValue == "") { fieldValue = null }
    updateDoc(doc(this.userProfilesCollection, user.id), field, fieldValue)
  }

  addSticker(sticker: Sticker) {
    addDoc(this.stickersCollection, sticker)
  }

  async getStickersForUser(userId: string): Promise<Sticker[]> {
    let stickers: Sticker[] = [];
    (await getDocs(query(this.stickersCollection, where("userId", "==", userId)))).docs.forEach(doc => {
      stickers.push(doc.data() as Sticker)
    })
    return stickers
  }

  async getStickersNotPrinted(): Promise<Sticker[]> {
    let stickers: Sticker[] = [];
    (await getDocs(query(this.stickersCollection, where("printed", "==", false)))).docs.forEach(doc => {
      stickers.push(doc.data() as Sticker)
    })
    return stickers
  }

  updateSticker(sticker: Sticker, field: string, fieldValue: string | boolean): void {
    updateDoc(doc(this.stickersCollection, sticker.id), field, fieldValue)
  }

  updateStickerLocation(sticker: Sticker, location: StickerLocation): void {
    // deep copy to ensure proper updating
    let locations = Object.assign([], sticker.locations)
    locations.push(location)
    updateDoc(doc(this.stickersCollection, sticker.id), { locations: locations })
  }
}
