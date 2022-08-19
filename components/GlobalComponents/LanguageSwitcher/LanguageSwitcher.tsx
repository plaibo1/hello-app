import React, { FC } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import classes from "./Language.module.scss";
import { COUNTRY_LIST } from "../../../constants/country";

interface IProps {
  className?: string;
}

interface IStyledProps {
  backgroundColor?: string;
  height?: string;
  mb?: string;
  mt?: string;
}

export const LanguageSwitcher: FC<IProps> = ({ className }) => {
  const { locale } = useRouter();
  return (
    <div className={className}>
      <div className={classes.languageTitle}>
        {COUNTRY_LIST[locale || "en"] || locale}
      </div>
      <div className={classes.languageIcon}>
        <Image
          src={`/images/lang_icons/flag_${locale}.svg`}
          height={16}
          width={16}
          alt="icon"
        />
      </div>
    </div>
  );
};

export const StyledLanguageSwitcher = styled(LanguageSwitcher)`
  display: flex;
  align-items: center;
`;
