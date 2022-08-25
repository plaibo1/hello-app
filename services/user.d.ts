export interface PhoneSchema {
  phone: {
    country: string;
    number: NationalNumber | undefined;
  };
}

export interface LoginSchema extends PhoneSchema {
  password: string;
}

export interface CodeConfirmSchema extends PhoneSchema {
  code: string;
  confirmType: string;
}

export interface NewPasswordScheme {
  newPassword: string;
}
