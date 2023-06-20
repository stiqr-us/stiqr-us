import { StickerLocation } from "./sticker-location";

export interface Sticker {
  id?: string,
  printed: boolean,
  picture: string,
  activationCode: string,
  activated: boolean,

  // if activated is true, all below fields should exist
  userId?: string,
  name?: string,
  lost?: boolean,
  locations?: StickerLocation[],
}
