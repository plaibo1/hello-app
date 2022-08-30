import React, { useContext, FC } from "react";
import {
  StyledButton,
  StyledDivider,
  StyledSubhead,
} from "../../GlobalComponents";
import { Context } from "../../../context";
import classes from "./TariffCard.module.scss";
import { useRouter } from "next/router";

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

  const handleStartTrial = () => {
    startTrial().then(() => {
      push({
        pathname: "/account",
        query: { show_modal: true },
      });
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
            {free}
          </StyledSubhead>
          <StyledSubhead
            display="inline"
            color="#848592"
            fontSize="16px"
            md={{ fontSize: "14px" }}
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
        Попробовать бесплатно
      </StyledButton>
    </div>
  );
};
