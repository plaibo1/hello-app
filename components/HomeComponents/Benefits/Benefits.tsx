import React from "react";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledButton,
  StyledListItem,
  StyledDivider,
  StyledTitle2,
  StyledBody2,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import Image from "next/image";
import classes from "./Benefits.module.scss";
import adaptiveClasses from "/styles/Adaptive.module.scss";
import { HOME_BENEFITS } from "../../../constants/benefits";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export const Benefits = () => {
  const { t } = useTranslation("common");
  const { push } = useRouter();
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col lg={12} xl={6} xlOffset={3}>
            <Row>
              <Col md={6} xl={12}>
                <StyledTitle2
                  textAlign="center"
                  mb="24px"
                  xl={{ textAlign: "left", lineHeight: "1.33" }}
                  md={{ textAlign: "center" }}
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "Больше возможностей с подпиской <span>Premium</span>",
                      {
                        interpolation: { escapeValue: false },
                      }
                    ),
                  }}
                />
                <div
                  className={`${adaptiveClasses["visible-xl"]} ${adaptiveClasses["hidden-md"]}`}
                >
                  {HOME_BENEFITS.map((benefit, index) => {
                    return (
                      <StyledListItem
                        key={benefit}
                        text={benefit}
                        color={
                          index === HOME_BENEFITS.length - 1
                            ? "#171717"
                            : "#848592"
                        }
                      />
                    );
                  })}
                </div>
              </Col>
              <Col md={6} xl={12}>
                <div className={classes.imageWrap}>
                  <Image
                    src="/images/mockup_premium_rs.png"
                    layout="fill"
                    alt="Benefit image"
                  />
                </div>
                <StyledDivider
                  mb="24px"
                  xl={{ display: "none" }}
                  md={{ display: "block" }}
                />
              </Col>
              <Col xl={12}>
                <Row
                  className={`${adaptiveClasses["hidden-xl"]} ${adaptiveClasses["visible-md"]}`}
                >
                  <Col sm={6}>
                    {HOME_BENEFITS.slice(0, 3).map((benefit) => {
                      return <StyledListItem key={benefit} text={benefit} />;
                    })}
                  </Col>
                  <Col sm={6}>
                    {HOME_BENEFITS.slice(3, 6).map((benefit, index) => {
                      return index === 2 ? (
                        <StyledListItem
                          key={benefit}
                          text={benefit}
                          color="#171717"
                        />
                      ) : (
                        <StyledListItem key={benefit} text={benefit} />
                      );
                    })}
                  </Col>
                </Row>
                <StyledDivider mb="24px" />
                <StyledBody2
                  textAlign="center"
                  color="#848592"
                  mb="20px"
                  xl={{ fontSize: "13px" }}
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "Получите <span>Premium бесплатно</span> на 1 месяц и получите новый опыт взаимодействия с приложением&#46;",
                      {
                        interpolation: { escapeValue: false },
                      }
                    ),
                  }}
                />
                <StyledButton
                  color="white"
                  padding="12px 100.5px"
                  ml="auto"
                  mr="auto"
                  display="block"
                  gradientBackground
                  onClick={() => push("/premium")}
                >
                  {t("Подробнее")}
                </StyledButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
