import React from "react";
import Image from "next/image";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledCard,
  StyledDivider,
  StyledTitle2,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import classes from "./WhatIsIt.module.scss";
import useTranslation from "next-translate/useTranslation";

export const WhatIsIt = () => {
  const { t } = useTranslation("common");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2
              textAlign="center"
              dangerouslySetInnerHTML={{
                __html: t("Что такое <span>Hello</span>", {
                  interpolation: { escapeValue: false },
                }),
              }}
            />
            <StyledDivider mb="24px" />
            <Row>
              <Col md={6}>
                <StyledCard
                  icon={
                    <Image
                      src="/images/icons/people_search.svg"
                      height={36}
                      width={36}
                      alt="icon"
                    />
                  }
                  title="Простой поиск"
                  text="Простой и удобный поиск людей поблизости, использующий bluetooth и работающий в фоне"
                  mb="24px"
                  xl={{ mb: "0px" }}
                />
              </Col>
              <Col md={6}>
                <StyledCard
                  icon={
                    <Image
                      src="/images/icons/account_filter.svg"
                      height={36}
                      width={36}
                      alt="icon"
                    />
                  }
                  title="Фильтры по категориям"
                  text="Система фильтрации, позволяющая тонко настроить поиск и находить только нужные вам контакты и знакомства"
                  mb="24px"
                  xl={{ mb: "0px" }}
                />
              </Col>
              <Col md={6}>
                <StyledCard
                  icon={
                    <Image
                      src="/images/icons/message.svg"
                      height={36}
                      width={36}
                      alt="icon"
                    />
                  }
                  title="Обмен сообщениями"
                  text="Короткие Push-сообщения, позволяющие быстро обмениваться своим профилем с другими людьми"
                  mb="24px"
                  xl={{ mb: "0px" }}
                />
              </Col>
              <Col md={6}>
                <StyledCard
                  icon={
                    <Image
                      src="/images/icons/slide_settings.svg"
                      height={36}
                      width={36}
                      alt="icon"
                    />
                  }
                  title="Широкий выбор настроек"
                  text="Настройки профилей и аккаунта, позволяющие настроить ваш опыт взаимодействия с приложением"
                  mb="24px"
                  xl={{ mb: "0px" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
