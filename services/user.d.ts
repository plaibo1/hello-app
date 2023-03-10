export interface PhoneSchema {
  country: string;
  number: NationalNumber | undefined;
}

export interface LoginSchema {
  password: string;
  email: string;
}

export interface CodeConfirmSchema {
  code: string;
  confirmType: string;
  email: string;
}

export interface NewPasswordScheme {
  newPassword: string;
}
