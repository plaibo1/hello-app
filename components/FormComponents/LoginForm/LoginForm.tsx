import React, { useState, useContext, useRef } from "react";
import {
  Logo,
  StyledTitle2,
  StyledButton,
  StyledLink,
} from "../../GlobalComponents";
import Image from "next/image";
import { useRouter } from "next/router";
import { PasswordInput } from "../PasswordInput";
import classes from "./LoginForm.module.scss";
import { Context } from "../../../context";
import useTranslation from "next-translate/useTranslation";
import { EmailInput } from "../EmailInput";
import { emailScheme, passwordSchema } from "Schemas/Login";
import { ValidationError } from "yup";

export const LoginForm = () => {
  const { t } = useTranslation("login");
  const { push, query, back, basePath } = useRouter();
  const { login } = useContext<any>(Context);
  const [disabledButton, setDisabledButton] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);

    if (event.target.value) {
      setEmailError("");
    }
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    if (event.target.value) {
      setPasswordError("");
    }
  };

  const handleFocusOut = () => {
    if (!emailValue) {
      setEmailError(t("invalidEmail"));
      setDisabledButton(true);
    } else {
      setEmailError("");
      setDisabledButton(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDisabledButton(true);
    setLoginError(false);
    setEmailError("");
    setPasswordError("");

    try {
      const vaildEmail = await emailScheme.validate({ email: emailValue });

      if (vaildEmail) {
        await login(
          {
            email: vaildEmail.email,
            password: passwordValue,
          },
          query.start_trial,
          query.tariff
        );
      }
    } catch (err) {
      console.error(err);

      if (err instanceof ValidationError && err.path === "email") {
        setEmailError(t("invalidEmail"));
      } else {
        setLoginError(true)
      }

      setDisabledButton(false);
    }
  };

  const handleBack = async () => {
    if (typeof window !== "undefined" && +window?.history?.length > 1) {
      back();
    } else {
      await push("/");
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
          <EmailInput
            value={emailValue}
            onChange={handleEmailInput}
            onFocusIn={() => {}}
            error={emailError}
            onFocusOut={handleFocusOut}
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
            disabled={!(emailValue && passwordValue) || disabledButton}
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
