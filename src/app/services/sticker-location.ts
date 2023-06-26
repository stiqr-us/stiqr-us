import { GeoPoint, Timestamp } from "@angular/fire/firestore"

export interface StickerLocation {
  geoPoint: GeoPoint,
  timestamp: Timestamp,
  scannerName?: string,
  scannerNumber?: string,
}
