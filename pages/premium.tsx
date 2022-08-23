import type { NextPage } from "next";
import * as cookie from "cookie";
import Head from "next/head";
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
  StyledTitle4,
} from "../components/GlobalComponents";
import classes from "../styles/Account.module.scss";
import { Row, Col } from "react-flexbox-grid";
import { useEffect, useContext } from "react";

import { Context } from "../context";
import { useRouter } from "next/router";
import { getSelfInfo } from "../services";

const MOC_BENEFITS = [
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Безлимитный просмотр профилей",
    text: "Смотрите и знакомьтесь без ограничений.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Избранные без ограничений",
    text: "Добавляйте в список Избранных важные знакомства.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Черный список",
    text: "Защитите себя от нежелательных знакомств.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Увеличенный срок хранения найденных профилей",
    text: "Смотрите всех, кого нашел Hello, в любое удобное время.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Показ пола и ориентации только по вашему усмотрению",
    text: "Показывайте пол и ориентацию только схожим с вами людям.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Уникальные профили",
    text: "Выделяйтесь среди всех с возможностью кастомизировать карточки профилей.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Отключение входящих сообщений",
    text: "Ограничьте отправку вам сообщений, для спокойной работы и отдыха.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Отображение вашего профиля только нужным вам людям",
    text: "Скрывайте свой профиль от нежелательных категорий пользователей.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Добавление в телефонную книгу всех полезных знакомств",
    text: "Экспортируйте всю полезную информацию из найденных профилей к себе на устройство.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Гиперссылки в профилях",
    text: "Переходите к коллегам и партнерам интересующих вас людей в один клик.",
  },
  {
    icon: "/images/icons/benefit_eye.svg",
    title: "Уникальный значок подписчика",
    text: "Добавьте значок Premium рядом с именем.",
  },
];

const Premium: NextPage = () => {
  const { push } = useRouter();
  const { t } = useTranslation("common");
  const { state } = useContext<any>(Context);

  return (
    <Layout>
      <section className={classes.profileSubscribe}>
        <Container>
          <Row between="xs">
            <Col md={6}>
              <Row start="xs">
                <Col md={12}>
                  <div className={classes.subscribeStatus}>
                    <StyledTitle4 mr="8px" mb="0px">
                      Hello
                      PremiumPremiumPremiumPremiumPremiumPremiumPremiumPremium
                    </StyledTitle4>
                    <StyledSubhead mt="0px" mb="0px" mr="24px" color="#848592">
                      3 месяца
                    </StyledSubhead>
                    <StyledSubscribeStatus active={true} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row end="xs">
                <Col md={5}>
                  <StyledButton
                    backgroundColor="#FAFAFA"
                    color="#171717"
                    padding="12px 47px"
                  >
                    Изменить тариф
                  </StyledButton>
                </Col>
                <Col md={12}>
                  <StyledButton
                    backgroundColor="unset"
                    color="#BF434A"
                    padding="12px 35px"
                    mb="0px"
                  >
                    Отменить подписку
                  </StyledButton>
                </Col>
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
                Откройте все преимущества Hello Premium
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
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res, resolvedUrl }: any) => {
  console.log(resolvedUrl);
  let initialState = {
    user: {
      auth: false,
      data: {},
      premium: {
        autoPayment: false,
        tariff: "",
        unactivate: 0,
      },
    },
  };
  if (cookie.parse(req.headers.cookie).access_token) {
    const userInfo = await getSelfInfo(
      cookie.parse(req.headers.cookie).access_token
    );
    initialState = {
      user: {
        auth: true,
        data: userInfo,
        premium: {
          autoPayment: false,
          tariff: "",
          unactivate: 0,
        },
      },
    };
    if (userInfo.premium) {
      res.setHeader("location", "/account");
      res.statusCode = 302;
      res.end();
    }
    return {
      props: { initialState },
    };
  }
  res.setHeader("location", "/login");
  res.statusCode = 302;
  res.end();

  return {
    props: { initialState },
  };
};

export default Premium;
