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
import { CountryCode } from "libphonenumber-js/types";
import classes from "./RecoveryForm.module.scss";
import { restorePassword, newPassword } from "../../../services";
import { passwordSchema } from "../../../Schemas/Login";
import { Context } from "../../../context";

export const RecoveryForm = () => {
  const { codeConfirm } = useContext<any>(Context);
  const { push } = useRouter();
  const [step, setStep] = useState<number>(1);
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [countryValue, setCountryValue] = useState<CountryCode>("RU");
  const [codeValue, setCodeValue] = useState<
    Array<number | string | undefined>
  >([]);
  const [codeError, setCodeError] = useState<string>("");

  const handlePhoneInput = useCallback((value: any) => {
    setPhoneValue(value);
  }, []);

  const handlePasswordInput = useCallback((event: any) => {
    setPasswordValue(event.target.value);
  }, []);

  const handleCodeInput = useCallback((index: number, target: any) => {
    if (
      target.value === "" &&
      target.value.length < target.maxLength &&
      target.previousSibling
    ) {
      target.previousSibling.focus();
    }
    if (target.value.length >= target.maxLength - 1 && target.nextSibling) {
      target.nextSibling.focus();
    }
    if (target.value.length < target.maxLength)
      setCodeValue((prevValue: (number | string | undefined)[]) => {
        const newArray = [...prevValue];
        newArray[index] = target.value;
        return newArray;
      });
  }, []);

  const handleCodeFocus = useCallback((event: any) => {}, []);

  const handleBack = useCallback(() => {
    if (step === 1) {
      push("/login");
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  }, [step, push]);

  const handlePhoneForm = () => {
    setPhoneError("");
    if (isValidPhoneNumber(phoneValue)) {
      const phoneParse = parsePhoneNumber(phoneValue);
      restorePassword({
        phone: {
          country: `+${phoneParse?.countryCallingCode}`,
          number: phoneParse?.nationalNumber,
        },
      })
        .then((data) => {
          setStep(2);
        })
        .catch((error) => setPhoneError(error.message));
    } else {
      setPhoneError("Неверный формат телефона");
    }
  };

  const handleCodeForm = () => {
    setCodeError("");
    if (!(codeValue.length < 4 || codeValue.includes(""))) {
      const phoneParse = parsePhoneNumber(phoneValue);
      codeConfirm({
        code: codeValue.join(""),
        confirmType: "restore",
        phone: {
          country: `+${phoneParse?.countryCallingCode}`,
          number: phoneParse?.nationalNumber,
        },
      })
        .then(() => {
          setStep(3);
        })
        .catch((error: any) => setCodeError(error));
    } else {
      setCodeError("Неверный формат кода");
    }
  };

  const handlePasswordForm = () => {
    passwordSchema
      .validate({
        password: passwordValue,
      })
      .then((data) => {
        newPassword({ newPassword: passwordValue })
          .then((data) => {
            push("/account");
          })
          .catch((error) => setPasswordError(error));
      })
      .catch((error) => {
        setPasswordError(error.errors);
      });
  };

  const StepOne = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="12px">
          Восстановление пароля
        </StyledTitle2>
        <StyledSubhead color="#848592" textAlign="center">
          Введите номер телефона, который был привязан к вашему аккаунту.
        </StyledSubhead>
        <PhoneInput
          value={phoneValue}
          onChange={handlePhoneInput}
          countryValue={countryValue}
          onChangeCountry={setCountryValue}
          error={phoneError}
        />
        <StyledButton
          type="button"
          color="white"
          disabled={phoneValue ? phoneValue.length < 1 : true}
          onClick={handlePhoneForm}
          mt="12px"
          mb="15px"
        >
          Далее
        </StyledButton>
      </>
    );
  };

  const StepTwo = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="12px">
          Введите код из смс
        </StyledTitle2>
        <StyledSubhead color="#848592" textAlign="center">
          Мы отправили его на номер{" "}
          {phoneValue
            ? formatPhoneNumber(phoneValue).replace(/(\d[ .-]?){6}$/, (x) =>
                x.replace(/\d/g, "*")
              )
            : "ТЕСТОВЫЙ"}
        </StyledSubhead>
        <CodeInput
          value={codeValue}
          onChange={handleCodeInput}
          onFocus={handleCodeFocus}
        />
        {codeError && (
          <div className={classes.errorTitle}>Введен неверный код</div>
        )}
        <StyledButton
          type="button"
          color="white"
          disabled={codeValue.length < 4 || codeValue.includes("")}
          onClick={handleCodeForm}
          mt="12px"
          mb="15px"
        >
          Далее
        </StyledButton>
      </>
    );
  };

  const StepThree = () => {
    return (
      <>
        <StyledTitle2 textAlign="center" mb="16px">
          Новый пароль
        </StyledTitle2>
        <PasswordInput
          value={passwordValue}
          onChange={handlePasswordInput}
          error={passwordError}
        />
        <StyledButton
          type="button"
          color="white"
          disabled={!passwordValue}
          onClick={handlePasswordForm}
          mt="12px"
          mb="15px"
        >
          Сохранить и войти
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
      <form className={classes.recoveryFormWrap}>
        {step === 1 && StepOne()}
        {step === 2 && StepTwo()}
        {step === 3 && StepThree()}
      </form>
    </>
  );
};
