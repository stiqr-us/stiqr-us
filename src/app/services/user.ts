export interface User {
  id?: string,
  admin: boolean,

  // shareXxxAlways: If true display always,
  // If false only display when lost.
  // Name should default to true,
  // all else should default to false.

  name: string,
  shareNameAlways: boolean,

  email: string | null,
  shareEmailAlways: boolean,

  number: string | null
  shareNumberAlways: boolean

  link: string | null,
  shareLinkAlways: boolean
}
