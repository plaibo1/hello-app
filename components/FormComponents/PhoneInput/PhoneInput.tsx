import React, { FC, useState } from "react";
import Image from "next/image";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";
import { CountryCode } from "libphonenumber-js/types";
import classes from "./PhoneInput.module.scss";
import InputMask from "react-input-mask";

interface IProps {
  value: string;
  onChange: (value: any) => void;
  onFocus: () => void;
  error: string;
}

export const PhoneInput: FC<IProps> = ({
  value,
  onChange,
  onFocus,
  error = "",
}) => {
  const handlePhoneChange = (event: any) => {
    onChange(event);
  };
  return (
    <label className={`${classes.phoneInput} ${error && classes.error}`}>
      <p className={classes.inputLabel}>Телефон</p>
      <div className={classes.inputWrap}>
        <Input
          value={value}
          placeholder="+7 (___) ___ __ __"
          onFocus={onFocus}
          onChange={handlePhoneChange}
          className={classes.input}
        />
      </div>
      {error && <div className={classes.errorTitle}>{error}</div>}
    </label>
  );
};
