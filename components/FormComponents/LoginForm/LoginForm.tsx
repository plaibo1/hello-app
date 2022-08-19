import React, { FC, useState } from "react";
import {
  Logo,
  StyledTitle2,
  StyledButton,
  StyledLink,
} from "../../GlobalComponents";
import { PhoneInput } from "../PhoneInput";
import { PasswordInput } from "../PasswordInput";
import { CountryCode } from "libphonenumber-js/types";
import classes from "./LoginForm.module.scss";

export const LoginForm = () => {
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [countryValue, setCountryValue] = useState<CountryCode>("RU");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handlePhoneInput = (value: any) => {
    setPhoneValue(value);
  };

  const handlePasswordInput = (value: any) => {
    setPasswordValue(value);
  };

  return (
    <div className={classes.loginFormWrap}>
      <Logo size="mini" />
      <StyledTitle2 textAlign="center" mt="4px">
        Вход
      </StyledTitle2>
      <form>
        <PhoneInput
          value={phoneValue}
          onChange={handlePhoneInput}
          countryValue={countryValue}
          onChangeCountry={setCountryValue}
        />
        <PasswordInput value={passwordValue} onChange={handlePasswordInput} />
        <StyledButton
          type="submit"
          color="white"
          disabled={true}
          mt="12px"
          mb="15px"
        >
          Войти
        </StyledButton>
        <StyledLink
          href="/recovery"
          color="#4392BF"
          textAlign="center"
          display="block"
          mb="0px"
        >
          Забыли пароль?
        </StyledLink>
      </form>
    </div>
  );
};
