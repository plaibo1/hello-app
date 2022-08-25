import React, { useContext, FC, useState, useRef } from "react";
import {
  StyledButton,
  StyledDivider,
  StyledSubhead,
  StyledTitle1,
  StyledTitle2,
  StyledTitle3,
} from "../../GlobalComponents";
import dayjs from "dayjs";
import Image from "next/image";
import { Context } from "../../../context";
import Container from "../../LayoutComponents/Container";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";
import Dialog from "rc-dialog";

import classes from "./TariffCard.module.scss";
import { changeTariff } from "../../../services";
import { useRouter } from "next/router";
import "rc-dialog/assets/index.css";
import { TARIFFS } from "../../../constants/tariffs";

interface IProps {
  tariff: {
    id: string;
    free: string;
    title: string;
    freeDescription: string;
    benefitPercent?: string;
    benefitBackground?: string;
    benefitDescription?: string;
    modalTitle: string;
    modalDescription: string;
  };
}

export const TariffCard: FC<IProps> = ({ tariff }) => {
  const { push } = useRouter();
  const { t } = useTranslation("common");
  const { startTrial } = useContext<any>(Context);
  const {
    free,
    title,
    benefitPercent,
    freeDescription,
    benefitBackground,
    benefitDescription,
  } = tariff;

  const handleStartTrial = () => {
    startTrial();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.textWrap}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.description}>
          <StyledSubhead display="inline" fontSize="16px">
            {free}
          </StyledSubhead>
          <StyledSubhead
            display="inline"
            color="#848592"
            fontSize="16px"
          >{`, ${freeDescription}`}</StyledSubhead>
        </div>
        <StyledDivider />
        {benefitPercent && benefitDescription && (
          <div className={classes.benefits}>
            <span
              className={classes.benefitPercent}
              style={{ backgroundColor: benefitBackground }}
            >
              {benefitPercent}
            </span>
            <span className={classes.benefitDescription}>
              {benefitDescription}
            </span>
          </div>
        )}
      </div>
      <StyledButton
        textAlign="center"
        color="white"
        padding="12px 36.5px"
        onClick={handleStartTrial}
        gradientBackground={true}
      >
        Попробовать бесплатно
      </StyledButton>
    </div>
  );
};
