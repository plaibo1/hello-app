import React, { FC, useState } from "react";
import Image from "next/image";
import classes from "./CodeInput.module.scss";

interface IProps {
  value: Array<number | undefined>;
  onChange: (index: number, value: any) => void;
}

export const CodeInput: FC<IProps> = ({ value, onChange }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <label className={classes.codeInput}>
      <input
        className={classes.input}
        maxLength={1}
        value={value[0]}
        onChange={(event) => onChange(0, event.target)}
      />
      <input
        className={classes.input}
        maxLength={1}
        value={value[1]}
        onChange={(event) => onChange(1, event.target)}
      />
      <input
        className={classes.input}
        maxLength={1}
        value={value[2]}
        onChange={(event) => onChange(2, event.target)}
      />
      <input
        className={classes.input}
        maxLength={1}
        value={value[3]}
        onChange={(event) => onChange(3, event.target)}
      />
    </label>
  );
};
