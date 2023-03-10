import React, { FC, useRef } from "react";
import { E164Number } from "libphonenumber-js/types.d";
import classes from "./EmailInput.module.scss";
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusIn: () => void;
  onFocusOut: () => void;
  error: string;
}

type TRef = HTMLInputElement | null;

export const EmailInput = forwardRef<TRef, IProps>(
  ({ value, onChange, onFocusIn, onFocusOut, error = "" }, ref) => {
    const { t } = useTranslation("inputs");

    return (
      <label className={`${classes.phoneInput} ${error && classes.error}`}>
        <p className={classes.inputLabel}>{t("emailLabel")}</p>
        <div className={classes.inputWrap}>
          <input
            value={value}
            placeholder="example@hello.com"
            onFocus={onFocusIn}
            onBlur={onFocusOut}
            onChange={onChange}
            className={classes.input}
            ref={ref}
            name="password" 
            autoComplete="on"
          />
        </div>
        {error && <div className={classes.errorTitle}>{error}</div>}
      </label>
    );
  }
);

EmailInput.displayName = "EmailInput";
