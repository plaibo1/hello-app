import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledBody2,
  StyledButton,
  StyledSubhead,
  StyledSubscribeStatus,
  StyledTitle4,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import classes from "./ProfileStatus.module.scss";
import { TARIFFS } from "../../../constants/tariffs";
import { Context } from "../../../context";
import { useRouter } from "next/router";
import { getBindCardUrl } from "../../../services";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  handleModalOpen: () => void;
}

export const ProfileStatus: FC<IProps> = ({ handleModalOpen }) => {
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const {
    state: {
      user: { premium, data },
    },
  } = useContext<any>(Context);
  console.log(premium);
  console.log(data);

  const handleBindCard = () => {
    getBindCardUrl().then((url) => {
      push(url.paymentUrl);
    });
  };

  return (
    <section className={classes.wrapper}>
      <Container>
        <Row between="xs" middle="xs">
          <Col lg={6}>
            <Row start="xs">
              <Col md={12}>
                <div className={classes.subscribeStatus}>
                  <div className={classes.leftWrap}>
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
                      {t(TARIFFS[premium.tariff])}
                    </StyledSubhead>
                  </div>
                  <StyledSubscribeStatus
                    active={
                      premium.autoPayment || premium.tariff === "trial"
                        ? "active"
                        : premium.unactivate === 0 || !data.premium
                        ? "paused"
                        : "stopped"
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
                  xl={{ mb: "24px" }}
                >
                  <span className={classes.payButton}>
                    <Image
                      src={
                        premium.isBlocked
                          ? "/images/icons/pay_fail.svg"
                          : "/images/icons/pay_button.svg"
                      }
                      width={28}
                      height={28}
                      alt="Pay button"
                    />
                  </span>
                  {premium.isBlocked
                    ? t("Платеж не прошел")
                    : `${
                        premium.tariff === "trial"
                          ? t("Бесплатно до")
                          : premium.autoPayment
                          ? t("Следующая оплата")
                          : premium.unactivate === 0
                          ? t(
                              "Привяжите карту к вашему аккаунту и оплатите тариф, для возобновления подписки"
                            )
                          : t("Действует до")
                      } ${
                        premium.unactivate === 0
                          ? ""
                          : `${dayjs
                              .unix(premium.unactivate)
                              .format("DD.MM.YYYY")}${
                              premium.tariff === "trial"
                                ? t(", далее по тарифу")
                                : ""
                            }`
                      }`}
                </StyledBody2>
              </Col>
              {((premium.tariff === "trial" && !premium.autoPayment) ||
                premium.isBlocked) && (
                <Col md={12}>
                  <StyledBody2
                    className={classes.premiumDuration}
                    color="#848592"
                    fontSize={premium.isBlocked ? "12px" : "16px"}
                    mt="16px"
                    xl={{ mb: "24px", mt: "0px" }}
                  >
                    {premium.isBlocked
                      ? t(
                          "Оплата подписки не была произведена, проверьте выбранный способ оплаты и попробуйте еще раз"
                        )
                      : t(
                          "Привяжите карту к вашему аккаунту для использования подписки после пробного периода"
                        )}
                  </StyledBody2>
                </Col>
              )}
            </Row>
          </Col>
          <Col lg={6}>
            <Row end="lg" center="xs" middle="xs">
              {premium.autoPayment && (
                <Col md={12}>
                  <StyledButton
                    backgroundColor="#FAFAFA"
                    color="#171717"
                    mb="4px"
                    padding="12px 47px"
                    onClick={() => push("/tariff")}
                  >
                    {t("Изменить тариф")}
                  </StyledButton>
                </Col>
              )}
              {premium.tariff === "trial" && !premium.autoPayment && (
                <Col md={12}>
                  <StyledButton
                    backgroundColor="#FAFAFA"
                    color="#171717"
                    padding="12px 47px"
                    onClick={handleBindCard}
                  >
                    {t("Привязать карту")}
                  </StyledButton>
                </Col>
              )}
              {premium.tariff !== "trial" &&
                !premium.autoPayment &&
                premium.unactivate === 0 && (
                  <Col md={12}>
                    <StyledButton
                      backgroundColor="#4392BF"
                      color="#FFFFFF"
                      padding="12px 47px"
                      mb="0px"
                      onClick={() =>
                        push(
                          {
                            pathname: "/tariff",
                            query: { tariff_payment: true },
                          },
                          "tariff"
                        )
                      }
                      blueButton={true}
                      xl={{ padding: "12px 59px" }}
                      md={{ padding: "12px 40px" }}
                    >
                      {t("Привязать карту и оплатить")}
                    </StyledButton>
                  </Col>
                )}
              {premium.tariff !== "trial" &&
                !premium.autoPayment &&
                premium.unactivate !== 0 &&
                !premium.isBlocked && (
                  <Col md={12}>
                    <StyledButton
                      backgroundColor="#4392BF"
                      color="#FFFFFF"
                      padding="12px 47px"
                      mb="0px"
                      onClick={() => push("/tariff")}
                      blueButton={true}
                      xl={{ padding: "12px 59px" }}
                    >
                      {t("Возобновить подписку")}
                    </StyledButton>
                  </Col>
                )}
              {premium.tariff !== "trial" &&
                !premium.autoPayment &&
                premium.unactivate !== 0 &&
                premium.isBlocked && (
                  <Col md={12}>
                    <StyledButton
                      backgroundColor="#4392BF"
                      color="#FFFFFF"
                      padding="12px 47px"
                      mb="0px"
                      onClick={() =>
                        push(
                          {
                            pathname: "/tariff",
                            query: { tariff_payment: true },
                          },
                          "tariff"
                        )
                      }
                      blueButton={true}
                      xl={{ padding: "12px 59px" }}
                    >
                      {t("Проверить платежные данные")}
                    </StyledButton>
                  </Col>
                )}
              {premium.tariff !== "trial" && premium.autoPayment && (
                <Col md={12}>
                  <StyledButton
                    backgroundColor="unset"
                    color="#BF434A"
                    padding="12px 35px"
                    mb="0px"
                    onClick={handleModalOpen}
                  >
                    {t("Отменить подписку")}
                  </StyledButton>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
