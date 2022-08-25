import type { NextPage } from "next";
import Dialog from "rc-dialog";
import dayjs from "dayjs";
import Image from "next/image";
import { Layout } from "../components/LayoutComponents/Layout";
import {
  StyledButton,
  StyledSubhead,
  StyledTitle3,
} from "../components/GlobalComponents";
import classes from "../styles/Account.module.scss";
import "rc-dialog/assets/index.css";
import { useContext, useState } from "react";

import { Context } from "../context";
import { checkAuth } from "../helpers/checkAuth";
import { ProfileStatus } from "../components/AccountComponents/ProfileStatus";
import { Benefits } from "../components/AccountComponents/Benefits";

const Account: NextPage = () => {
  const { state, cancelTariff } = useContext<any>(Context);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    //changeTariff(tariff).catch((error: any) => setError(error));
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCancelSubscribe = () => {
    cancelTariff()
      .then(() => {
        setModalOpen(false);
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <Layout>
      <ProfileStatus handleModalOpen={handleModalOpen} />
      <Benefits />
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
              Отменить подписку?
            </StyledTitle3>
            <StyledSubhead mb="12px" textAlign="center">
              {`${
                state.user.premium.tariff === "trial"
                  ? "Бесплатно до"
                  : state.user.premium.autoPayment
                  ? "Следующая оплата"
                  : "Действует до"
              } ${dayjs
                .unix(state.user.premium.unactivate)
                .format("DD.MM.YYYY")}${
                state.user.premium.tariff === "trial" ? ", далее по тарифу" : ""
              }`}
            </StyledSubhead>
            <StyledSubhead mb="24px" textAlign="center" color="#848592">
              После все привилегии станут недоступны
            </StyledSubhead>
            <StyledButton
              blueButton
              mb="4px"
              padding="12px 54.5px"
              onClick={handleModalClose}
            >
              Оставить подписку
            </StyledButton>
            <StyledButton
              color="#BF434A"
              backgroundColor="unset"
              padding="12px 0px"
              onClick={handleCancelSubscribe}
            >
              Отменить подписку
            </StyledButton>
          </div>
        )}
      ></Dialog>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  return checkAuth(req, res, resolvedUrl);
};

export default Account;
