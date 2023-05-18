import { GeoPoint, Timestamp } from "@angular/fire/firestore"

export interface Sticker {
  id?: string,
  printed: boolean,
  activationCode: string,
  activated: boolean,
  userId?: string,
  name?: string,
  lost: boolean,
  locations: { location: GeoPoint, timestamp: Timestamp }[],
}
