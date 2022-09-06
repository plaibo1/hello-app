import React from "react";
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
import { PhoneImage } from "../PhoneImage";

export const Jumbotron = () => {
  const { t } = useTranslation("home");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={6}>
            <Row>
              <Col md={12}>
                <StyledTitle1 md={{ textAlign: "center" }}>
                  {t("jumbotron.title")}
                </StyledTitle1>
              </Col>
              <Col xl={8}>
                <StyledSubhead
                  mb="48px"
                  xl={{ mb: "24px" }}
                  md={{ textAlign: "center" }}
                >
                  {t("jumbotron.subtitle")}
                </StyledSubhead>
              </Col>
              <Col md={12} className={adaptiveClasses["hidden-xl"]}>
                <StyledTitle4>{t("jumbotron.downloadText")}</StyledTitle4>
                <DownloadBlock color="white" />
              </Col>
              <Col md={12} className={adaptiveClasses["visible-xl"]}>
                <StyledButton
                  backgroundColor="white"
                  color="#171717"
                  padding="12px 46px"
                  whiteButton
                  xl={{ mb: "0px", padding: "12px 65px" }}
                  md={{
                    padding: "12px 30px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {t("jumbotron.downloadLink")}
                </StyledButton>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <PhoneImage />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
