import React, { FC } from "react";
import { E164Number } from "libphonenumber-js/types.d";
import Input from "react-phone-number-input/input";
import classes from "./PhoneInput.module.scss";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
  onFocus: () => void;
  error: string;
}

export const PhoneInput: FC<IProps> = ({
  value,
  onChange,
  onFocus,
  error = "",
}) => {
  const { t } = useTranslation("common");
  return (
    <label className={`${classes.phoneInput} ${error && classes.error}`}>
      <p className={classes.inputLabel}>{t("Телефон")}</p>
      <div className={classes.inputWrap}>
        <Input
          value={value}
          placeholder="+7 (___) ___ __ __"
          onFocus={onFocus}
          onChange={onChange}
          autoComplete="off"
          className={classes.input}
        />
      </div>
      {error && <div className={classes.errorTitle}>{t(error)}</div>}
    </label>
  );
};
