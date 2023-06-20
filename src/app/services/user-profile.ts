export interface UserProfile {
  id?: string,
  admin?: boolean,

  // shareXxxAlways: If true display always,
  // If false only display when lost.
  // All shareXxxAlways should default to true.

  name: string,
  shareNameAlways: boolean,

  email: string | null,
  shareEmailAlways: boolean,

  number: string | null
  shareNumberAlways: boolean

  link: string | null,
  shareLinkAlways: boolean
}
