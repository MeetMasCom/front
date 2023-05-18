export interface User {
  data: any;
  userName: string;
  email: string;
  dateBirth: string;
  password: string;
  terms: boolean;
  country: string;
}

export interface LoginUser {
  userNameL: string;
  passwordL: string;
}
