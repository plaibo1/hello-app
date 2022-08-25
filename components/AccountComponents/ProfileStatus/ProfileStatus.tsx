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
  );
};
