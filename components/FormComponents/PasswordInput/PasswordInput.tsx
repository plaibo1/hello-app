import React, { FC, useState, useCallback } from "react";
import Image from "next/image";
import classes from "./PasswordInput.module.scss";

interface IProps {
  value: string;
  onChange: (value: any) => void;
  error: string;
}

export const PasswordInput: FC<IProps> = ({ value, onChange, error }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = useCallback(() => {
    setIsVisible((prevState) => !prevState);
  }, []);

  console.log(error);

  return (
    <label className={`${classes.passwordInput}  ${error && classes.error}`}>
      <p className={classes.inputLabel}>Пароль</p>
      <div className={classes.inputWrap}>
        <input
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={classes.input}
          placeholder="Введите пароль"
          aria-invalid
        />
        <div className={classes.isVisibleButton} onClick={handleVisible}>
          <Image
            src="/images/icons/toggle_password.svg"
            width={44}
            height={44}
            alt="Toggle password visible"
          />
        </div>
      </div>
      {error.length > 0 && <div className={classes.errorTitle}>{error[0]}</div>}
    </label>
  );
};
