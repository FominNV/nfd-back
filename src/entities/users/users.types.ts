export interface UserCreationAttrs {
  username: string;
  password: string;
}

export enum UserRolesType {
  ADMIN = "admin",
  USER = "user",
}
