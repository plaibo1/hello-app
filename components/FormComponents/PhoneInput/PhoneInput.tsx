import React, { FC, useRef } from "react";
import { E164Number } from "libphonenumber-js/types.d";
import Input from "react-phone-number-input/input";
import classes from "./PhoneInput.module.scss";
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";

interface IProps {
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
  onFocusIn: () => void;
  onFocusOut: () => void;
  error: string;
}

type TRef = HTMLInputElement | null;

export const PhoneInput = forwardRef<TRef, IProps>(({
  value,
  onChange,
  onFocusIn,
  onFocusOut,
  error = "",
}, ref) => {
  const { t } = useTranslation("inputs");

  return (
    <label className={`${classes.phoneInput} ${error && classes.error}`}>
      <p className={classes.inputLabel}>{t("phoneLabel")}</p>
      <div className={classes.inputWrap}>
        <Input
          value={value}
          placeholder="+7 (___) ___ __ __"
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          onChange={onChange}
          autoComplete="off"
          className={classes.input}
          ref={ref}
        />
      </div>
      {error && <div className={classes.errorTitle}>{error}</div>}
    </label>
  )
});

PhoneInput.displayName = 'PhoneInput';