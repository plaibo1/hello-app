import type { NextPage } from "next";
import Dialog from "rc-dialog";
import dayjs from "dayjs";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Layout } from "../components/LayoutComponents/Layout";
import Container from "../components/LayoutComponents/Container";
import {
  StyledButton,
  StyledCard,
  StyledDivider,
  StyledSubhead,
  StyledSubscribeStatus,
  StyledTitle2,
  StyledTitle3,
  StyledTitle4,
} from "../components/GlobalComponents";
import classes from "../styles/Account.module.scss";
import "rc-dialog/assets/index.css";
import { Row, Col } from "react-flexbox-grid";
import { useEffect, useContext, useState } from "react";

import { Context } from "../context";
import { useRouter } from "next/router";
import { getBindCardUrl, getSelfInfo } from "../services";
import { checkAuth } from "../helpers/checkAuth";
import { StyledBody2 } from "../components/GlobalComponents/Body2";
import { TARIFFS } from "../constants/tariffs";
import { MOC_BENEFITS } from "../constants/benefits";

const Account: NextPage = () => {
  const { replace, push } = useRouter();
  const { t } = useTranslation("common");
  const { state, cancelTariff } = useContext<any>(Context);
  const [bindCardUrl, setBindCardUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  console.log(state);

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

  useEffect(() => {
    getBindCardUrl().then((url) => {
      console.log(url);
      setBindCardUrl(url.paymentUrl);
    });
  }, []);

  return (
    <Layout>
      <section className={classes.profileSubscribe}>
        <Container>
          <Row between="xs" middle="xs">
            <Col md={6}>
              <Row start="xs">
                <Col md={12}>
                  <div className={classes.subscribeStatus}>
                    <StyledTitle4 mr="8px" mb="0px">
                      Hello Premium
                    </StyledTitle4>
                    <StyledSubhead
                      mt="0px"
                      mb="0px"
                      mr="24px"
                      color="#848592"
                      textTransform="capitalize"
                    >
                      {TARIFFS[state.user.premium.tariff]}
                    </StyledSubhead>
                    <StyledSubscribeStatus
                      active={
                        state.user.premium.autoPayment ||
                        state.user.premium.tariff === "trial"
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row start="xs">
                <Col md={12}>
                  <StyledBody2
                    className={classes.premiumDuration}
                    color="#848592"
                  >
                    <span className={classes.payButton}>
                      <Image
                        src="/images/icons/pay_button.svg"
                        width={28}
                        height={28}
                        alt="Pay button"
                      />
                    </span>
                    {`${
                      state.user.premium.tariff === "trial"
                        ? "Бесплатно до"
                        : state.user.premium.autoPayment
                        ? "Следующая оплата"
                        : "Действует до"
                    } ${dayjs
                      .unix(state.user.premium.unactivate)
                      .format("DD.MM.YYYY")}${
                      state.user.premium.tariff === "trial"
                        ? ", далее по тарифу"
                        : ""
                    }`}
                  </StyledBody2>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row end="md" center="xs" middle="xs">
                {state.user.premium.autoPayment && (
                  <Col md={12}>
                    <StyledButton
                      backgroundColor="#FAFAFA"
                      color="#171717"
                      padding="12px 47px"
                      onClick={() => push("/tariff")}
                    >
                      Изменить тариф
                    </StyledButton>
                  </Col>
                )}
                {state.user.premium.tariff === "trial" &&
                  !state.user.premium.autoPayment && (
                    <Col md={12}>
                      <StyledButton
                        backgroundColor="#FAFAFA"
                        color="#171717"
                        padding="12px 47px"
                        onClick={() =>
                          replace(`${bindCardUrl}&successURL=test.com`)
                        }
                      >
                        Привязать карту
                      </StyledButton>
                    </Col>
                  )}
                {state.user.premium.tariff !== "trial" &&
                  !state.user.premium.autoPayment && (
                    <Col md={12}>
                      <StyledButton
                        backgroundColor="#4392BF"
                        color="#FFFFFF"
                        padding="12px 47px"
                        mb="0px"
                        onClick={() => push("/tariff")}
                        blueButton={true}
                      >
                        Подключить подписку
                      </StyledButton>
                    </Col>
                  )}
                {state.user.premium.tariff !== "trial" &&
                  state.user.premium.autoPayment && (
                    <Col md={12}>
                      <StyledButton
                        backgroundColor="unset"
                        color="#BF434A"
                        padding="12px 35px"
                        mb="0px"
                        onClick={handleModalOpen}
                      >
                        Отменить подписку
                      </StyledButton>
                    </Col>
                  )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={classes.premiumBenefits}>
        <Container>
          <Row>
            <Col md={12}>
              <StyledTitle2 textAlign="center">
                Откройте все преимущества <span>Hello Premium</span>
              </StyledTitle2>
              <StyledDivider mb="24px" />
            </Col>
          </Row>
          <Row>
            {MOC_BENEFITS.map((benefit) => {
              return (
                <Col md={3} key={benefit.title}>
                  <StyledCard
                    icon={
                      <Image
                        src={benefit.icon}
                        height={36}
                        width={36}
                        alt="icon"
                      />
                    }
                    title={benefit.title}
                    text={benefit.text}
                    iconPosition="top"
                    padding="0px"
                    mb="50px"
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
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
