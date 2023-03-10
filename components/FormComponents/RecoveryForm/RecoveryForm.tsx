import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  StyledTitle2,
  StyledButton,
  StyledSubhead,
} from "../../GlobalComponents";
import Image from "next/image";
import { useRouter } from "next/router";
import { PhoneInput } from "../PhoneInput";
import { CodeInput } from "../CodeInput";
import { PasswordInput } from "../PasswordInput";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types.d";
import classes from "./RecoveryForm.module.scss";
import { restorePassword, newPassword } from "../../../services";
import { emailScheme, passwordSchema } from "../../../Schemas/Login";
import { Context } from "../../../context";
import useTranslation from "next-translate/useTranslation";
import TimerButton from "../TimerButton/TimerButton";
import { EmailInput } from "../EmailInput";
import { ValidationError } from "yup";
import useTimer from "../useTimer/useTimer";

export const RecoveryForm = () => {
  const { t } = useTranslation("recovery");
  const { locale } = useRouter();
  const { codeConfirm } = useContext<any>(Context);
  const { push } = useRouter();
  const [step, setStep] = useState<number>(1);
  const [disabledButton, setDisabledButton] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [codeValue, setCodeValue] = useState<
    Array<number | string | undefined>
  >(["", "", "", ""]);
  const [codeError, setCodeError] = useState<string>("");
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);

    if (event.target.value) {
      setEmailError("");
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

  const handlePasswordInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(event.target.value);
    },
    []
  );

  const handleCodeInput = useCallback(
    (index: number, target: HTMLInputElement) => {
      if (
        target.value === "" &&
        target.value.length < target.maxLength &&
        target.previousSibling &&
        (target.previousSibling as HTMLInputElement).value === ""
      ) {
        (target.previousSibling as HTMLInputElement).focus();
      }
      if (target.value.length >= target.maxLength - 1 && target.nextSibling) {
        (target.nextSibling as HTMLInputElement).focus();
      }
      if (target.value.length < target.maxLength)
        setCodeValue((prevValue: (number | string | undefined)[]) => {
          const newArray = [...prevValue];
          newArray[index] = target.value;
          return newArray;
        });
    },
    []
  );

  const handleCodeFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const target = event.target;
      if (
        target.value === "" &&
        target.value.length < target.maxLength &&
        target.previousSibling &&
        (target.previousSibling as HTMLInputElement).value === ""
      ) {
        (target.previousSibling as HTMLInputElement).focus();
      }
      if (
        target.value !== "" &&
        target.nextSibling &&
        (target.nextSibling as HTMLInputElement).value !== ""
      ) {
        (target.nextSibling as HTMLInputElement).focus();
      }
    },
    []
  );

  const handleBack = useCallback(() => {
    if (step === 1) {
      push("/login");
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  }, [step, push]);

  const sendEmail = async () => {
    try {
      const validEmail = await emailScheme.validate({email: emailValue})
      if (validEmail) {
        await restorePassword({email: validEmail.email, language: locale || "en"});
        localStorage.setItem('lastTime', JSON.stringify(Math.floor(Date.now() / 1000)));
        return true;
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        setEmailError(t("invalidEmail"));
        return false;
      }
      
      if (error.response.data.error.code === 11) {        
        return true;
      }

      setEmailError(error.response.data?.error.message);
    }
  };

  const handleEmailForm = useCallback(async () => {
    setDisabledButton(true);
    setEmailError("");

    const successEmailSend = await sendEmail();
    if (successEmailSend) {
      setStep(2);
    }

    setDisabledButton(false);
  }, [emailValue, t]);

  const handleCodeForm = useCallback(async () => {
    setDisabledButton(true);
    setCodeError("");
    if (emailValue && !(codeValue.length < 4 || codeValue.includes(""))) {
      try {
        await codeConfirm({
          code: codeValue.join(""),
          confirmType: "restore",
          email: emailValue,
        });
        setStep(3);
      } catch (error: any) {
        setCodeError(error);
      }
    } else {
      setCodeError(t("codeError"));
    }
    setDisabledButton(false);
  }, [codeConfirm, codeValue, emailValue, t]);

  const handlePasswordForm = useCallback(async () => {
    setDisabledButton(true);
    try {
      await passwordSchema.validate({
        password: passwordValue,
      });
      await newPassword({ newPassword: passwordValue });
      push("/account");
    } catch (error: any) {
      if (error instanceof ValidationError && error.path === "password") {
        setPasswordError(t(error.message));
      } else {
        setPasswordError(error?.response?.data.error.message || error.errors);
      }
      setDisabledButton(false);
    }
  }, [passwordValue, push]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (step === 1) {
        handleEmailForm();
      } else if (step === 2) {
        handleCodeForm();
      } else if (step === 3) {
        handlePasswordForm();
      }
    },
    [handleCodeForm, handlePasswordForm, handleEmailForm, step]
  );

  const replaceMiddleOfEmail = (string: string) => {
    const arr = [...Array.from(string)];
    arr.splice(Math.round(string.length / 4), Math.round(string.length / 2), "...")

    return arr.join('');
  }

  const StepOne = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="12px">
          {t("title")}
        </StyledTitle2>
        <StyledSubhead color="#848592" textAlign="center">
          {t("subtitle")}
        </StyledSubhead>
        <EmailInput
          value={emailValue}
          onChange={handleEmailInput}
          onFocusIn={() => {}}
          error={emailError}
          onFocusOut={handleFocusOut}
          ref={phoneInputRef}
        />
        <StyledButton
          type="submit"
          color="white"
          disabled={
            (emailValue ? emailValue.length < 1 : true) || disabledButton
          }
          mt="12px"
          mb="15px"
          md={{ padding: "12px 0px", width: "100%", textAlign: "center" }}
        >
          {t("nextButton")}
        </StyledButton>
      </>
    );
  };

  const StepTwo = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="12px">
          {t("codeTitle")}
        </StyledTitle2>
        <StyledSubhead color="#848592" textAlign="center">
          {t("codeSubtitle")}{" "}
          {emailValue.length >= 65 ? replaceMiddleOfEmail(emailValue) : emailValue}
          {/* {phoneValue
            ? formatPhoneNumber(phoneValue).replace(/(\d[ .-]?){6}$/, (x) =>
                x.replace(/\d/g, "*")
              )
            : "codeTestPhone"} */}
        </StyledSubhead>
        <CodeInput
          value={codeValue}
          onChange={handleCodeInput}
          onFocus={handleCodeFocus}
        />
        {codeError && (
          <div className={classes.errorTitle}>{t("codeError")}</div>
        )}
        <StyledButton
          type="submit"
          color="white"
          disabled={
            codeValue.length < 4 || codeValue.includes("") || disabledButton
          }
          mt="12px"
          mb="15px"
          md={{ padding: "12px 0px", width: "100%", textAlign: "center" }}
        >
          {t("nextButton")}
        </StyledButton>

        <TimerButton 
          sendFunction={sendEmail}
        />
      </>
    );
  };

  const StepThree = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="16px">
          {t("passwordTitle")}
        </StyledTitle2>
        <PasswordInput
          value={passwordValue}
          onChange={handlePasswordInput}
          error={passwordError}
        />
        <StyledButton
          type="submit"
          color="white"
          disabled={!passwordValue || disabledButton}
          mt="12px"
          mb="15px"
          md={{ padding: "12px 0px", width: "100%", textAlign: "center" }}
        >
          {t("saveButton")}
        </StyledButton>
      </>
    );
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
      <form className={classes.recoveryFormWrap} onSubmit={handleFormSubmit}>
        {step === 1 && StepOne()}
        {step === 2 && StepTwo()}
        {step === 3 && StepThree()}
      </form>
    </>
  );
};
