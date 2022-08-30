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

interface IProps {
  handleModalOpen: () => void;
}

export const ProfileStatus: FC<IProps> = ({ handleModalOpen }) => {
  const { replace, push } = useRouter();
  const { state } = useContext<any>(Context);
  const [bindCardUrl, setBindCardUrl] = useState<string>("");

  useEffect(() => {
    getBindCardUrl().then((url) => {
      setBindCardUrl(url.paymentUrl);
    });
  }, []);

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
                      {TARIFFS[state.user.premium.tariff]}
                    </StyledSubhead>
                  </div>
                  <StyledSubscribeStatus
                    active={
                      state.user.premium.autoPayment ||
                      state.user.premium.tariff === "trial"
                        ? "active"
                        : state.user.premium.unactivate === 0 ||
                          !state.user.data.premium
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
                        state.user.premium.isBlocked
                          ? "/images/icons/pay_fail.svg"
                          : "/images/icons/pay_button.svg"
                      }
                      width={28}
                      height={28}
                      alt="Pay button"
                    />
                  </span>
                  {state.user.premium.isBlocked
                    ? "Платеж не прошел"
                    : `${
                        state.user.premium.tariff === "trial"
                          ? "Бесплатно до"
                          : state.user.premium.autoPayment
                          ? "Следующая оплата"
                          : state.user.premium.unactivate === 0
                          ? "Привяжите карту к вашему аккаунту и оплатите тариф, для возобновления подписки"
                          : "Действует до"
                      } ${
                        state.user.premium.unactivate === 0
                          ? ""
                          : `${dayjs
                              .unix(state.user.premium.unactivate)
                              .format("DD.MM.YYYY")}${
                              state.user.premium.tariff === "trial"
                                ? ", далее по тарифу"
                                : ""
                            }`
                      }`}
                </StyledBody2>
              </Col>
              {((state.user.premium.tariff === "trial" &&
                !state.user.premium.autoPayment) ||
                state.user.premium.isBlocked) && (
                <Col md={12}>
                  <StyledBody2
                    className={classes.premiumDuration}
                    color="#848592"
                    fontSize={state.user.premium.isBlocked ? "12px" : "16px"}
                    mt="16px"
                    xl={{ mb: "24px", mt: "0px" }}
                  >
                    {state.user.premium.isBlocked
                      ? "Оплата подписки не была произведена, проверьте выбранный способ оплаты и попробуйте еще раз"
                      : "Привяжите карту к вашему аккаунту для использования подписки после пробного периода"}
                  </StyledBody2>
                </Col>
              )}
            </Row>
          </Col>
          <Col lg={6}>
            <Row end="lg" center="xs" middle="xs">
              {state.user.premium.autoPayment && (
                <Col md={12}>
                  <StyledButton
                    backgroundColor="#FAFAFA"
                    color="#171717"
                    mb="4px"
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
                !state.user.premium.autoPayment &&
                state.user.premium.unactivate === 0 && (
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
                      Привязать карту и оплатить
                    </StyledButton>
                  </Col>
                )}
              {state.user.premium.tariff !== "trial" &&
                !state.user.premium.autoPayment &&
                state.user.premium.unactivate !== 0 &&
                !state.user.premium.isBlocked && (
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
                      Возобновить подписку
                    </StyledButton>
                  </Col>
                )}
              {state.user.premium.tariff !== "trial" &&
                !state.user.premium.autoPayment &&
                state.user.premium.unactivate !== 0 &&
                state.user.premium.isBlocked && (
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
                      Проверить платежные данные
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
  );
};
