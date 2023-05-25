export interface User {
  userName: string;
  email: string;
  dateBirth: string;
  password: string;
  terms: boolean;
  country: string;
  gender: string;
  prefer: string;
}

export interface LoginUser {
  userNameL: string;
  passwordL: string;
}
