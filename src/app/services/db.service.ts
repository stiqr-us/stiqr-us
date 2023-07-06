import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth'
import { UserProfile } from '../types/user-profile';
import { Sticker } from '../types/sticker';
import { StickerLocation } from '../types/sticker-location';
import { Observable, ObservedValueOf, of, switchMap } from 'rxjs';

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

  initUser(user: User): void {
    this.addUserProfile(user.uid, {
      name: user.displayName || "Anonymous",
      shareNameAlways: true,

      email: user.email || undefined,
      shareEmailAlways: true,

      number: user.phoneNumber || undefined,
      shareNumberAlways: true,

      link: undefined,
      shareLinkAlways: true,
    })
  }

  addUserProfile(userId: string, userProfile: UserProfile): void {
    setDoc(doc(this.userProfilesCollection, userId), userProfile);
  }

  getUserProfile$(userId: string): Observable<UserProfile> {
    return docData(doc(this.userProfilesCollection, userId), {idField: 'id'}) as Observable<UserProfile>;
  }

  updateUserProfile(userId: string, field: string, fieldValue: string | boolean): void {
    if (!fieldValue) { // same as fieldValue == ''
      let fieldValue = undefined
    } else if (field == "name" && !fieldValue) {
      // TODO: Tell user they can't have null values
      alert('Name can\'t be empty')
      return
    };
    updateDoc(doc(this.userProfilesCollection, userId), field, fieldValue);
  }

  addSticker(sticker: Sticker) {
    addDoc(this.stickersCollection, sticker)
  }

  getSticker$(stickerId: string): Observable<Sticker> {
    return docData(doc(this.stickersCollection, stickerId), {idField: 'id'}) as Observable<Sticker>;
  }

  getStickersForUser$(userId: string): Observable<Sticker[]> {
    return collectionData(query(this.stickersCollection, where("userId", "==", userId)), {idField: 'id'}) as Observable<Sticker[]>
  }

  getStickersNotPrinted$(): Observable<Sticker[]> {
    return collectionData(query(this.stickersCollection, where("printed", "==", false)), {idField: 'id'}) as Observable<Sticker[]>
  }

  updateSticker(stickerId: string, field: string, fieldValue: string | boolean): void {
    updateDoc(doc(this.stickersCollection, stickerId), field, fieldValue)
  }

  updateStickerLocation(sticker: Sticker, location: StickerLocation): void {
    if (!sticker.locations) {sticker.locations = []}
    sticker.locations.push(location)
    updateDoc(doc(this.stickersCollection, sticker.id), { locations: sticker.locations })
  }
}
