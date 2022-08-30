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
  const { replace } = useRouter();
  const { state, changeTariff, tariffPayment } = useContext<any>(Context);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const userTariffRef = useRef<string>(state.user.premium.tariff);
  const {
    id,
    free,
    title,
    benefitPercent,
    freeDescription,
    benefitBackground,
    benefitDescription,
    modalTitle,
    modalDescription,
  } = tariff;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTariffPayment = (tariff: string) => {
    tariffPayment(tariff)
      .then((data: { paymentUrl: string }) => {
        replace(data.paymentUrl);
      })
      .catch((error: string) => setError(error));
  };

  const handleChangeTariff = (tariff: string) => {
    changeTariff(tariff).catch((error: string) => setError(error));
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.description}>
        <StyledSubhead display="inline" fontSize="14px">
          {free}
        </StyledSubhead>
        <StyledSubhead
          display="inline"
          color="#848592"
          fontSize="14px"
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
      >
        Перейти
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
              {modalTitle}
            </StyledTitle3>
            <StyledSubhead mb="12px" textAlign="center">
              {`Оплата будет произведена ${dayjs
                .unix(state.user.premium.unactivate)
                .format("DD.MM.YYYY")}, после ${
                state.user.premium.tariff === "trial"
                  ? "пробного периода"
                  : "истечения подписки"
              } “${TARIFFS[userTariffRef.current]}”`}
            </StyledSubhead>
            <StyledSubhead mb="24px" textAlign="center" color="#848592">
              {modalDescription}
            </StyledSubhead>
            <StyledButton
              blueButton
              mb="4px"
              onClick={() => handleChangeTariff(id)}
            >
              Перейти
            </StyledButton>
            <StyledButton
              color="#4392BF"
              backgroundColor="unset"
              padding="12px 0px"
              mb="0px"
              onClick={handleModalClose}
            >
              Остаться на своей подписке
            </StyledButton>
          </div>
        )}
      ></Dialog>
    </div>
  );
};
