import React, { FC } from "react";
import classes from "./CodeInput.module.scss";

interface IProps {
  value: Array<number | string | undefined>;
  onChange: (index: number, target: HTMLInputElement) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CodeInput: FC<IProps> = ({ value, onChange, onFocus }) => {
  const handleDelete = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event?.target as HTMLInputElement;
    if (
      target.value === "" &&
      target.value.length < target.maxLength &&
      target.previousSibling &&
      event.keyCode === 8
    ) {
      (target.previousSibling as HTMLInputElement).focus();
    }
  };
  return (
    <label className={classes.codeInput}>
      <input
        className={classes.input}
        maxLength={2}
        value={value[0]}
        onChange={(event) => onChange(0, event.target)}
        onFocus={onFocus}
        onKeyDown={handleDelete}
      />
      <input
        className={classes.input}
        maxLength={2}
        value={value[1]}
        onChange={(event) => onChange(1, event.target)}
        onFocus={onFocus}
        onKeyDown={handleDelete}
      />
      <input
        className={classes.input}
        maxLength={2}
        value={value[2]}
        onChange={(event) => onChange(2, event.target)}
        onFocus={onFocus}
        onKeyDown={handleDelete}
      />
      <input
        className={classes.input}
        maxLength={2}
        value={value[3]}
        onChange={(event) => onChange(3, event.target)}
        onFocus={onFocus}
        onKeyDown={handleDelete}
      />
    </label>
  );
};
