import { GeoPoint, Timestamp } from "@angular/fire/firestore"

export interface Sticker {
  id?: string,
  printed: boolean,
  picture: string,
  activationCode: string,
  activated: boolean,
  userId?: string,
  name?: string,
  lost: boolean,
  locations: {
    location: GeoPoint,
    timestamp: Timestamp,
    scannerName?: string,
    scannerNumber?: string,
  }[],
}
