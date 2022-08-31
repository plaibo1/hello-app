import React, { useContext, FC } from "react";
import {
  StyledButton,
  StyledDivider,
  StyledSubhead,
} from "../../GlobalComponents";
import { Context } from "../../../context";
import classes from "./TariffCard.module.scss";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

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
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const { state, startTrial } = useContext<any>(Context);
  const {
    id,
    free,
    title,
    benefitPercent,
    freeDescription,
    benefitBackground,
    benefitDescription,
  } = tariff;

  const handleStartTrial = async () => {
    await startTrial();
    push({
      pathname: "/account",
      query: { show_modal: true },
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.textWrap}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.description}>
          <StyledSubhead
            display="inline"
            fontSize="16px"
            md={{ fontSize: "14px" }}
          >
            {t(free)}
          </StyledSubhead>
          <StyledSubhead
            display="inline"
            color="#848592"
            fontSize="16px"
            md={{ fontSize: "14px" }}
          >{`, ${t(freeDescription)}`}</StyledSubhead>
        </div>
        <StyledDivider />
        {benefitPercent && benefitDescription && (
          <div className={classes.benefits}>
            <span
              className={classes.benefitPercent}
              style={{ backgroundColor: benefitBackground }}
            >
              {t(benefitPercent)}
            </span>
            <span className={classes.benefitDescription}>
              {t(benefitDescription)}
            </span>
          </div>
        )}
      </div>
      <StyledButton
        textAlign="center"
        color="white"
        mb="0px"
        padding="12px 36.5px"
        onClick={() =>
          state.user.auth
            ? handleStartTrial()
            : push(
                {
                  pathname: "/login",
                  query: { start_trial: true, tariff: id },
                },
                "login"
              )
        }
        gradientBackground={true}
      >
        {t("Попробовать бесплатно")}
      </StyledButton>
    </div>
  );
};
