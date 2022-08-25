export interface PhoneSchema {
  country: string;
  number: NationalNumber | undefined;
}

export interface LoginSchema {
  password: string;
  phone: PhoneSchema;
}

export interface CodeConfirmSchema {
  code: string;
  confirmType: string;
  phone: PhoneSchema;
}

export interface NewPasswordScheme {
  newPassword: string;
}
