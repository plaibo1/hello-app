import React, { useCallback, useContext, useState } from "react";
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
import { passwordSchema } from "../../../Schemas/Login";
import { Context } from "../../../context";
import useTranslation from "next-translate/useTranslation";

export const RecoveryForm = () => {
  const { t } = useTranslation("recovery");
  const { codeConfirm } = useContext<any>(Context);
  const { push } = useRouter();
  const [step, setStep] = useState<number>(1);
  const [phoneValue, setPhoneValue] = useState<E164Number | undefined>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [codeValue, setCodeValue] = useState<
    Array<number | string | undefined>
  >(["", "", "", ""]);
  const [codeError, setCodeError] = useState<string>("");

  const handlePhoneInput = useCallback((value: E164Number | undefined) => {
    setPhoneValue(value);
  }, []);

  const handlePasswordInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(event.target.value);
    },
    []
  );

  const handleFirstFocus = () => {
    if (!phoneValue) {
      setPhoneValue("+7");
    }
  };

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
    (event: React.FocusEvent<HTMLInputElement>) => {},
    []
  );

  const handleBack = useCallback(() => {
    if (step === 1) {
      push("/login");
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  }, [step, push]);

  const handlePhoneForm = useCallback(async () => {
    setPhoneError("");
    if (phoneValue && isValidPhoneNumber(phoneValue)) {
      const phoneParse = parsePhoneNumber(phoneValue);
      try {
        await restorePassword({
          country: `+${phoneParse?.countryCallingCode}`,
          number: phoneParse?.nationalNumber,
        });
        setStep(2);
      } catch (error: any) {
        console.log(error);
        setPhoneError(error.response.data.error.message);
      }
    } else {
      setPhoneError(t("phoneError"));
    }
  }, [phoneValue, t]);

  const handleCodeForm = useCallback(async () => {
    setCodeError("");
    if (phoneValue && !(codeValue.length < 4 || codeValue.includes(""))) {
      const phoneParse = parsePhoneNumber(phoneValue);
      try {
        await codeConfirm({
          code: codeValue.join(""),
          confirmType: "restore",
          phone: {
            country: `+${phoneParse?.countryCallingCode}`,
            number: phoneParse?.nationalNumber,
          },
        });
        setStep(3);
      } catch (error: any) {
        setCodeError(error);
      }
    } else {
      setCodeError(t("codeError"));
    }
  }, [codeConfirm, codeValue, phoneValue, t]);

  const handlePasswordForm = useCallback(async () => {
    try {
      await passwordSchema.validate({
        password: passwordValue,
      });
      try {
        await newPassword({ newPassword: passwordValue });
        push("/account");
      } catch (error: any) {
        setPasswordError(error.response.data.error.message);
      }
    } catch (error: any) {
      setPasswordError(error.response.data.error.message);
    }
  }, [passwordValue, push]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (step === 1) {
        handlePhoneForm();
      } else if (step === 2) {
        handleCodeForm();
      } else if (step === 3) {
        handlePasswordForm();
      }
    },
    [handleCodeForm, handlePasswordForm, handlePhoneForm, step]
  );

  const StepOne = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="12px">
          {t("title")}
        </StyledTitle2>
        <StyledSubhead color="#848592" textAlign="center">
          {t("subtitle")}
        </StyledSubhead>
        <PhoneInput
          value={phoneValue}
          onChange={handlePhoneInput}
          error={phoneError}
          onFocus={handleFirstFocus}
        />
        <StyledButton
          type="submit"
          color="white"
          disabled={phoneValue ? phoneValue.length < 1 : true}
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
          {phoneValue
            ? formatPhoneNumber(phoneValue).replace(/(\d[ .-]?){6}$/, (x) =>
                x.replace(/\d/g, "*")
              )
            : "codeTestPhone"}
        </StyledSubhead>
        <CodeInput
          value={codeValue}
          onChange={handleCodeInput}
          onFocus={handleCodeFocus}
        />
        {codeError && (
          <div className={classes.errorTitle}>{t("Введен неверный код")}</div>
        )}
        <StyledButton
          type="submit"
          color="white"
          disabled={codeValue.length < 4 || codeValue.includes("")}
          mt="12px"
          mb="15px"
          md={{ padding: "12px 0px", width: "100%", textAlign: "center" }}
        >
          {t("nextButton")}
        </StyledButton>
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
          disabled={!passwordValue}
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
