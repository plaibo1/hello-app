import React, { useState, useContext, useRef } from "react";
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
import { E164Number } from "libphonenumber-js/types.d";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import classes from "./LoginForm.module.scss";
import { Context } from "../../../context";
import useTranslation from "next-translate/useTranslation";

export const LoginForm = () => {
  const { t } = useTranslation("login");
  const { push, query, back, basePath } = useRouter();
  const { login } = useContext<any>(Context);
  const [disabledButton, setDisabledButton] = useState(false);
  const [phoneValue, setPhoneValue] = useState<E164Number | undefined>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhoneInput = (value: E164Number | undefined) => {
    setPhoneValue(value);

    if (phoneInputRef.current?.value && isValidPhoneNumber(phoneInputRef.current?.value)) {
      setPhoneError("");
      setDisabledButton(false);
    }
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const handleFirstFocus = () => {
    if (!phoneValue) {
      setPhoneValue("+7");
    }
  };

  const handleFocusOut = () => {
    if (!(phoneValue && isValidPhoneNumber(phoneValue))) {
      setPhoneError("Неверный формат телефона");
      setDisabledButton(true);
    } else {
      setPhoneError("");
      setDisabledButton(false);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDisabledButton(true);
    setLoginError("");
    setPhoneError("");
    setPasswordError("");
    if (phoneValue && isValidPhoneNumber(phoneValue)) {
      const phoneParse = parsePhoneNumber(phoneValue);

      try {
        await login(
          {
            password: passwordValue,
            phone: {
              country: `+${phoneParse?.countryCallingCode}`,
              number: phoneParse?.nationalNumber,
            },
          },
          query.start_trial,
          query.tariff
        );
      } catch (error: any) {
        setLoginError(error);
        setDisabledButton(false);
      }
    } else {
      setPhoneError("Неверный формат телефона");
      setDisabledButton(false);
    }
  };

  const handleBack = async () => {
    if (typeof window !== 'undefined' && + window?.history?.length > 1) {
      back()
    } else {
      await push('/')
    }
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
          {t("title")}
        </StyledTitle2>
        <form onSubmit={(event) => handleSubmit(event)} autoComplete="off">
          <PhoneInput
            value={phoneValue}
            onChange={handlePhoneInput}
            onFocus={handleFirstFocus}
            error={phoneError}
            onBlur={handleFocusOut}
            ref={phoneInputRef}
          />
          <PasswordInput
            value={passwordValue}
            onChange={handlePasswordInput}
            error={passwordError}
          />
          {loginError && (
            <div className={classes.errorTitle}>{t("loginError")}</div>
          )}
          <StyledButton
            type="submit"
            color="white"
            disabled={!(phoneValue && passwordValue) || disabledButton}
            mt="12px"
            mb="15px"
          >
            {t("submitButton")}
          </StyledButton>
          <StyledLink
            href="/recovery"
            color="#4392BF"
            textAlign="center"
            display="block"
          >
            {t("recoveryPassword")}
          </StyledLink>
        </form>
      </div>
    </>
  );
};
