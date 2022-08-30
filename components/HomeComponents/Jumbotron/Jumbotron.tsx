import React from "react";
import Image from "next/image";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledButton,
  StyledSubhead,
  StyledTitle1,
  StyledTitle4,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import { DownloadBlock } from "../DownloadBlock";
import classes from "./Jumbotron.module.scss";
import adaptiveClasses from "/styles/Adaptive.module.scss";
import useTranslation from "next-translate/useTranslation";

export const Jumbotron = () => {
  const { t } = useTranslation("common");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={6}>
            <Row>
              <Col md={12}>
                <StyledTitle1 md={{ textAlign: "center" }}>
                  {t("Новые знакомства рядом с вами")}
                </StyledTitle1>
              </Col>
              <Col xl={8}>
                <StyledSubhead
                  mb="48px"
                  xl={{ mb: "24px" }}
                  md={{ textAlign: "center" }}
                >
                  {t(
                    "Ищите новые знакомства и полезные контакты через bluetooth, в приложении Hello"
                  )}
                </StyledSubhead>
              </Col>
              <Col md={12} className={adaptiveClasses["hidden-xl"]}>
                <StyledTitle4>
                  {t(
                    "Скачивайте приложение и присоединяйтесь с сообществу Hello"
                  )}
                </StyledTitle4>
                <DownloadBlock color="white" />
              </Col>
              <Col md={12} className={adaptiveClasses["visible-xl"]}>
                <StyledButton
                  backgroundColor="white"
                  color="#171717"
                  padding="12px 46px"
                  whiteButton
                  xl={{ mb: "0px", padding: "12px 65px" }}
                >
                  {t("Скачать приложение")}
                </StyledButton>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <div className={classes.jumbotronImageWrap}>
              <div className={classes.jumbotronImage}>
                <Image
                  src="/images/home_banner.png"
                  layout="fill"
                  alt="Header image"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
