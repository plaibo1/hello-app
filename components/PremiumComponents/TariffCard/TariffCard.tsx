import React, { useContext, FC } from "react";
import {
  StyledButton,
  StyledDivider,
  StyledSubhead,
} from "../../GlobalComponents";
import { Context } from "../../../context";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import classes from "./TariffCard.module.scss";

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
    notBenefitPrice: boolean | null;
  };
}

export const TariffCard: FC<IProps> = ({ tariff }) => {
  const { t } = useTranslation("premium");
  const { push, replace } = useRouter();
  const { state, startTrial, tariffPayment } = useContext<any>(Context);
  const {
    id,
    free,
    title,
    benefitPercent,
    freeDescription,
    benefitBackground,
    benefitDescription,
    notBenefitPrice
  } = tariff;

  const isEndedPremium = () => {
    return (
      state.user.data.trial &&
      !state.user.premium?.autoPayment &&
      state.user.premium?.unactivate === 0
    );
  };

  const handleStartTrial = async () => {
    if (isEndedPremium()) {
      try {
        const { paymentUrl } = await tariffPayment(id);
        replace(paymentUrl);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      await startTrial(id);
      push({
        pathname: "/account",
        query: { show_modal: true },
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.textWrap}>
        <h3 className={classes.title}>{t(`chooseTariff.items.${id}.title`)}</h3>
        <div className={classes.description}>
          <StyledSubhead
            display="inline"
            fontSize="16px"
            md={{ fontSize: "14px" }}
          >
            {t(`chooseTariff.items.${id}.free`)}
          </StyledSubhead>
          <StyledSubhead
            display="inline"
            color="#848592"
            fontSize="16px"
            md={{ fontSize: "14px" }}
          >{`, ${t(
            `chooseTariff.items.${id}.freeDescription`
          )}`}</StyledSubhead>
        </div>
        <StyledDivider />
        <div className={classes.price}>
            {
              notBenefitPrice &&
              <span className={classes.benefitPrice}>
                {t(`chooseTariff.items.${id}.notBenefitPrice`)
              }</span>
            }
            <span className={classes.defaultPrice}>
              {t(`chooseTariff.items.${id}.price`)}
            </span>
        </div>
        {benefitPercent && benefitDescription && (
          <div className={classes.benefits}>
            <span
              className={classes.benefitPercent}
              style={{ backgroundColor: benefitBackground }}
            >
              {t(`chooseTariff.items.${id}.benefitPercent`)}
            </span>
            <span className={classes.benefitDescription}>
              {t(`chooseTariff.items.${id}.benefitDescription`)}
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
        {isEndedPremium()
          ? t("chooseTariff.button.withTrial")
          : t("chooseTariff.button.withoutTrial")}
      </StyledButton>
    </div>
  );
};
