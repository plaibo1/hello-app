import React, { FC, useState } from "react";
import Image from "next/image";
import classes from "./PasswordInput.module.scss";

interface IProps {
  value: string;
  onChange: (value: any) => void;
}

export const PasswordInput: FC<IProps> = ({ value, onChange }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <label className={classes.passwordInput}>
      <p className={classes.inputLabel}>Пароль</p>
      <div className={classes.inputWrap}>
        <input
          type={isVisible ? "text" : "password"}
          className={classes.input}
          placeholder="Введите пароль"
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
    </label>
  );
};
