import type { GetServerSideProps, NextPage } from "next";
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
import { useContext, useState, useEffect } from "react";

import { Context } from "../context";
import { checkAuth } from "../helpers/checkAuth";
import { ProfileStatus } from "../components/AccountComponents/ProfileStatus";
import { Benefits } from "../components/AccountComponents/Benefits";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const Account: NextPage = () => {
  const { t } = useTranslation("account");
  const { query } = useRouter();
  const { state, cancelTariff } = useContext<any>(Context);
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);

  const handleCancelModalOpen = () => {
    setCancelModalOpen(true);
  };

  const handleCancelModalClose = () => {
    setCancelModalOpen(false);
  };

  const handleTrialModalOpen = () => {
    setTrialModalOpen(true);
  };

  const handleTrialModalClose = () => {
    setTrialModalOpen(false);
  };

  const handleCancelSubscribe = async () => {
    try {
      await cancelTariff();
      setCancelModalOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query?.show_modal) {
      handleTrialModalOpen();
    }
  }, [query.show_modal]);

  return (
    <Layout meta={{ title: t("pageTitle") }}>
      <ProfileStatus handleModalOpen={handleCancelModalOpen} />
      <Benefits />
      <Dialog
        onClose={handleCancelModalClose}
        visible={cancelModalOpen}
        className={classes.modalWrapper}
        modalRender={() => (
          <div className={classes.modalContent}>
            <div
              className={classes.modalClose}
              onClick={handleCancelModalClose}
            >
              <Image
                src="/images/icons/dismiss.svg"
                width={24}
                height={24}
                alt="Close modal"
              />
            </div>
            <StyledTitle3 mb="12px" textAlign="center">
              {t("???????????????? ?????????????????")}
            </StyledTitle3>
            <StyledSubhead mb="12px" textAlign="center">
              {`${
                state.user.premium.tariff === "trial"
                  ? "?????????????????? ????"
                  : state.user.premium.autoPayment
                  ? "?????????????????? ????????????"
                  : "?????????????????? ????"
              } ${dayjs
                .unix(state.user.premium.unactivate)
                .format("DD.MM.YYYY")}${
                state.user.premium.tariff === "trial" ? ", ?????????? ???? ????????????" : ""
              }`}
            </StyledSubhead>
            <StyledSubhead mb="24px" textAlign="center" color="#848592">
              {t("?????????? ?????? ???????????????????? ???????????? ????????????????????")}
            </StyledSubhead>
            <StyledButton
              blueButton
              mb="4px"
              padding="12px 54.5px"
              onClick={handleCancelModalClose}
            >
              {t("???????????????? ????????????????")}
            </StyledButton>
            <StyledButton
              color="#BF434A"
              backgroundColor="unset"
              padding="12px 0px"
              onClick={handleCancelSubscribe}
              mb="0px"
            >
              {t("???????????????? ????????????????")}
            </StyledButton>
          </div>
        )}
      ></Dialog>
      <Dialog
        onClose={handleTrialModalClose}
        visible={trialModalOpen}
        className={classes.modalWrapper}
        modalRender={() => (
          <div className={classes.modalContent}>
            <div className={classes.modalClose} onClick={handleTrialModalClose}>
              <Image
                src="/images/icons/dismiss.svg"
                width={24}
                height={24}
                alt="Close modal"
              />
            </div>
            <StyledTitle3 mb="12px" textAlign="center">
              {t("???????????????? ??????????????????!")}
            </StyledTitle3>
            <StyledSubhead mb="24px" textAlign="center">
              {t(
                "?????????????????????????? ?????????? ???????????????????????? ???????????????? Hello Premium ?????????? ????????????."
              )}
            </StyledSubhead>
            <StyledButton
              blueButton
              mb="4px"
              padding="12px 54.5px"
              onClick={handleTrialModalClose}
            >
              {t("?????????????? ?? ????????????????????")}
            </StyledButton>
            <StyledButton
              color="#4392BF"
              backgroundColor="unset"
              padding="12px 0px"
              onClick={handleTrialModalClose}
              mb="0px"
            >
              {t("???????????????? ????????????????????")}
            </StyledButton>
          </div>
        )}
      ></Dialog>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
  locale
}) => {
  return checkAuth(req, res, resolvedUrl, locale);
};

export default Account;
