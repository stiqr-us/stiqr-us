import { AuthProvider } from "firebase/auth";

export interface Provider {
  name: string,
  type: AuthProvider
}
