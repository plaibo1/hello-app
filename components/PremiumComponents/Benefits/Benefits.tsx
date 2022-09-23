import React from "react";
import { Col, Row } from "react-flexbox-grid";
import { StyledDivider, StyledTitle2 } from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./Benefits.module.scss";
import dynamic from "next/dynamic";
import ContentLoader from "react-content-loader";
import useTranslation from "next-translate/useTranslation";

const DynamicSwiper = dynamic(() => import("../SwiperWrap/") as any, {
  ssr: false,
});

export const Benefits = () => {
  const { t } = useTranslation("premium");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2
              textAlign="center"
              dangerouslySetInnerHTML={{
                __html: t("benefits.title", {
                  interpolation: { escapeValue: false },
                }),
              }}
            />
            <StyledDivider mb="40px" lg={{ mb: "32px" }} />
          </Col>
        </Row>
        <Row>
          <div style={{ width: "100%" }}>
            <DynamicSwiper />
          </div>
        </Row>
      </Container>
    </section>
  );
};
