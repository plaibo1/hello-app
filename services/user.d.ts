export interface PhoneSchema {
  phone: {
    country: string;
    number: NationalNumber | undefined;
  };
}

export interface LoginSchema extends PhoneSchema {
  password: string;
}
