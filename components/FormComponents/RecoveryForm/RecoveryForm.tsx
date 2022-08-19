import React, { FC, useState } from "react";
import {
  StyledTitle2,
  StyledButton,
  StyledLink,
  StyledSubhead,
} from "../../GlobalComponents";
import { PhoneInput } from "../PhoneInput";
import { CodeInput } from "../CodeInput";
import { formatPhoneNumber } from "react-phone-number-input";
import { CountryCode } from "libphonenumber-js/types";
import classes from "./RecoveryForm.module.scss";

export const RecoveryForm = () => {
  const [step, setStep] = useState<Number>(1);
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [countryValue, setCountryValue] = useState<CountryCode>("RU");
  const [codeValue, setCodeValue] = useState<Array<number | undefined>>([]);

  const handlePhoneInput = (value: any) => {
    setPhoneValue(value);
  };

  const handleCodeInput = (index: number, target: any) => {
    if (target.value.length >= target.maxLength) {
    }
    setCodeValue((prevValue: (number | undefined)[]) => {
      const newArray = [...prevValue];
      newArray[index] = target.value;
      return newArray;
    });
  };

  console.log(formatPhoneNumber(phoneValue));

  if (step === 1) {
    return (
      <div className={classes.recoveryFormWrap}>
        <StyledTitle2 textAlign="center" mb="12px">
          Восстановление пароля
        </StyledTitle2>
        <StyledSubhead color="#848592" textAlign="center">
          Введите номер телефона, который был привязан к вашему аккаунту.
        </StyledSubhead>
        <form>
          <PhoneInput
            value={phoneValue}
            onChange={handlePhoneInput}
            countryValue={countryValue}
            onChangeCountry={setCountryValue}
          />
          <StyledButton
            type="submit"
            color="white"
            onClick={() => setStep(2)}
            mt="12px"
            mb="15px"
          >
            Далее
          </StyledButton>
        </form>
      </div>
    );
  }
  return (
    <div className={classes.recoveryFormWrap}>
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
      <form>
        <CodeInput value={codeValue} onChange={handleCodeInput} />
        <StyledButton
          type="submit"
          color="white"
          disabled={true}
          mt="12px"
          mb="15px"
        >
          Далее
        </StyledButton>
      </form>
    </div>
  );
};
