export interface UserProfile {
  id?: string,

  // shareXxxAlways: If true display always,
  // If false only display when lost.
  // All shareXxxAlways should default to true.

  name: string,
  shareNameAlways: boolean,

  email?: string,
  shareEmailAlways: boolean,

  number?: string,
  shareNumberAlways: boolean,

  link?: string,
  shareLinkAlways: boolean
}
