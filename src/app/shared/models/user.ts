export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}

// export interface User {
//     uid: string;
//     email: string;
//     displayName: string;
//     photoURL: string;
//     emailVerified: boolean;
// }
