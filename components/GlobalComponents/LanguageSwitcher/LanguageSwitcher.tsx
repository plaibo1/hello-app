import React, { FC } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import classes from "./Language.module.scss";
import { COUNTRY_LIST } from "../../../constants/country";
import { md } from "../../../constants/windowWidth";

interface IProps {
  className?: string;
}

export const LanguageSwitcher: FC<IProps> = ({ className }) => {
  const { pathname, asPath, query, push, locale } = useRouter();

  const targetLocale = locale === "ru" ? "en" : "ru";

  const handleLocaleChange = () => {
    push({ pathname, query }, asPath, {
      locale: targetLocale,
    });
  };
  return (
    <div className={className}>
      <div className={classes.languageTitle}>
        {COUNTRY_LIST[targetLocale || "en"] || locale}
      </div>
      <div className={classes.languageIcon} onClick={handleLocaleChange}>
        <Image
          src={`/images/lang_icons/flag_${targetLocale}.svg`}
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
  @media (max-width: ${md}) {
    margin-bottom: 8px;
  }
`;
