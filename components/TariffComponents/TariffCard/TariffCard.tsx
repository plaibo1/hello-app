import React, { useContext, FC, useState, useRef } from "react";
import {
  StyledButton,
  StyledDivider,
  StyledSubhead,
  StyledTitle3,
} from "../../GlobalComponents";
import dayjs from "dayjs";
import Image from "next/image";
import { Context } from "../../../context";
import Dialog from "rc-dialog";

import classes from "./TariffCard.module.scss";
import "rc-dialog/assets/index.css";
import { TARIFFS } from "../../../constants/tariffs";
import { useRouter } from "next/router";
import { iif } from "rxjs";
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
  const { t } = useTranslation("tariff");
  const { replace } = useRouter();
  const { state, changeTariff, tariffPayment } = useContext<any>(Context);
  const [error, setError] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { id, title, benefitPercent, benefitBackground, benefitDescription } =
    tariff;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTariffPayment = async (tariff: string) => {
    try {
      const { paymentUrl } = await tariffPayment(tariff);
      replace(paymentUrl);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleChangeTariff = async (tariff: string) => {
    setDisabledButton(true);
    try {
      await changeTariff(tariff);
    } catch {
      setDisabledButton(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.description}>
          <StyledSubhead display="inline" fontSize="14px">
            {t(`items.${id}.free`)}
          </StyledSubhead>
          <StyledSubhead
            display="inline"
            color="#848592"
            fontSize="14px"
          >{`, ${t(`items.${id}.freeDescription`)}`}</StyledSubhead>
        </div>
        <StyledDivider />
        {benefitPercent && benefitDescription && (
          <div className={classes.benefits}>
            <span
              className={classes.benefitPercent}
              style={{ backgroundColor: benefitBackground }}
            >
              {t(`items.${id}.benefitPercent`)}
            </span>
            <span className={classes.benefitDescription}>
              {t(`items.${id}.benefitDescription`)}
            </span>
          </div>
        )}
      </div>
      <StyledButton
        textAlign="center"
        color="white"
        padding="12px 36.5px"
        onClick={() =>
          state.user.premium.tariff !== "trial" &&
          !state.user.premium.autoPayment &&
          state.user.premium.unactivate === 0
            ? handleTariffPayment(id)
            : handleModalOpen()
        }
        gradientBackground={true}
        mb="0px"
      >
        {t("button")}
      </StyledButton>
      <Dialog
        onClose={handleModalClose}
        visible={modalOpen}
        className={classes.modalWrapper}
        modalRender={() => (
          <div className={classes.modalContent}>
            <div className={classes.modalClose} onClick={handleModalClose}>
              <Image
                src="/images/icons/dismiss.svg"
                width={24}
                height={24}
                alt="Close modal"
              />
            </div>
            <StyledTitle3 mb="12px" textAlign="center">
              {t(`items.${id}.modalTitle`)}
            </StyledTitle3>
            <StyledSubhead mb="12px" textAlign="center">
              {`${t("paymentWillBe")} ${dayjs
                .unix(state.user.premium.unactivate)
                .format("DD.MM.YYYY")}, ${t("after")} ${
                state.user.premium.tariff === "trial"
                  ? t("afterTariff.withTrial")
                  : t("afterTariff.withTariff")
              } “${t(`items.${id}.title`)}”`}
            </StyledSubhead>
            <StyledSubhead mb="24px" textAlign="center" color="#848592">
              {t(`items.${id}.modalDescription`)}
            </StyledSubhead>
            <StyledButton
              blueButton
              disabled={disabledButton}
              mb="4px"
              onClick={() => handleChangeTariff(id)}
            >
              {t("button")}
            </StyledButton>
            <StyledButton
              color="#4392BF"
              backgroundColor="unset"
              padding="12px 0px"
              mb="0px"
              onClick={handleModalClose}
            >
              {t("cancelChangeButton")}
            </StyledButton>
          </div>
        )}
      ></Dialog>
    </div>
  );
};
