import React, { FC, useState, useContext } from "react";
import {
  Logo,
  StyledTitle2,
  StyledButton,
  StyledLink,
} from "../../GlobalComponents";
import Image from "next/image";
import { useRouter } from "next/router";
import { PhoneInput } from "../PhoneInput";
import { PasswordInput } from "../PasswordInput";
import { CountryCode } from "libphonenumber-js/types";
import {
  isValidPhoneNumber,
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import classes from "./LoginForm.module.scss";
import { Context } from "../../../context";
import { passwordSchema } from "../../../Schemas/Login";

export const LoginForm = () => {
  const { push } = useRouter();
  const { dispatch, login } = useContext<any>(Context);
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [countryValue, setCountryValue] = useState<CountryCode>("RU");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handlePhoneInput = (value: any) => {
    setPhoneValue(value);
  };

  const handlePasswordInput = (event: any) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoginError("");
    setPhoneError("");
    setPasswordError("");
    if (isValidPhoneNumber(phoneValue)) {
      passwordSchema
        .validate({
          password: passwordValue,
        })
        .then(async (data) => {
          const phoneParse = parsePhoneNumber(phoneValue);
          try {
            const loginPromise = await login({
              password: passwordValue,
              phone: {
                country: `+${phoneParse?.countryCallingCode}`,
                number: phoneParse?.nationalNumber,
              },
            });
          } catch (error: any) {
            setLoginError(error);
          }
        })
        .catch((error) => {
          setPasswordError(error.errors);
        });
    } else {
      setPhoneError("Неверный формат телефона");
    }
  };

  const handleBack = () => {
    push("/");
  };

  return (
    <>
      <div className={classes.backArrow} onClick={handleBack}>
        <Image
          src="/images/icons/arrow_left.svg"
          width={28}
          height={28}
          alt="Back to previous step"
        />
      </div>
      <div className={classes.loginFormWrap}>
        <Logo size="mini" />
        <StyledTitle2 textAlign="center" mt="4px">
          Вход
        </StyledTitle2>
        <form onSubmit={(event) => handleSubmit(event)}>
          <PhoneInput
            value={phoneValue}
            onChange={handlePhoneInput}
            countryValue={countryValue}
            onChangeCountry={setCountryValue}
            error={phoneError}
          />
          <PasswordInput
            value={passwordValue}
            onChange={handlePasswordInput}
            error={passwordError}
          />
          {loginError && (
            <div className={classes.errorTitle}>
              Введен неверный логин или пароль
            </div>
          )}
          <StyledButton
            type="submit"
            color="white"
            disabled={!(phoneValue && passwordValue)}
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
          >
            Забыли пароль?
          </StyledLink>
        </form>
      </div>
    </>
  );
};
