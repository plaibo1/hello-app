import React, { FC, useState } from "react";
import Image from "next/image";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";
import flags from "react-phone-number-input/flags";
import { Logo, StyledTitle2 } from "../../GlobalComponents";
import CustomSelect from "./CustomSelect";
import { CountryCode } from "libphonenumber-js/types";
import classes from "./PhoneInput.module.scss";

interface IProps {
  value: string;
  onChange: (value: any) => void;
  countryValue: CountryCode;
  onChangeCountry: (value: CountryCode) => void;
  error: string;
}

const CountrySelect = ({ value, onChange, labels, error, ...rest }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={classes.countryBox}
      onClick={() => setOpen((opened) => !opened)}
    >
      <div className={classes.countryCode}>+{getCountryCallingCode(value)}</div>
      <Image
        src={`https://flag.pk/flags/4x3/${value}.svg`}
        width={16}
        height={16}
        alt="country"
        style={{ borderRadius: "50%", width: "16px" }}
      />
      <div
        className={classes.countrySelect}
        style={{ display: open ? "block" : "none" }}
      >
        {getCountries().map((country) => (
          <div
            key={country}
            onClick={() => onChange(country)}
            className={classes.countryBox}
          >
            <div className={classes.countryCode}>
              +{getCountryCallingCode(country)}
            </div>
            <Image
              src={`https://flag.pk/flags/4x3/${country}.svg`}
              width={16}
              height={16}
              alt="country"
              style={{ borderRadius: "50%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const PhoneInput: FC<IProps> = ({
  value,
  onChange,
  countryValue,
  onChangeCountry,
  error = "",
}) => {
  return (
    <label className={`${classes.phoneInput} ${error && classes.error}`}>
      <p className={classes.inputLabel}>Телефон</p>
      <div className={classes.inputWrap}>
        <CountrySelect
          value={countryValue}
          onChange={onChangeCountry}
          labels={ru}
        />
        <Input
          value={value}
          onChange={onChange}
          country={countryValue}
          className={classes.input}
        />
      </div>
      {error && <div className={classes.errorTitle}>{error}</div>}
    </label>
  );
};
