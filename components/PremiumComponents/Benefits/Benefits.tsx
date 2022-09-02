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
  const { t } = useTranslation("common");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2
              textAlign="center"
              dangerouslySetInnerHTML={{
                __html: t(
                  "Откройте все преимущества <span>Hello Premium</span>",
                  {
                    interpolation: { escapeValue: false },
                  }
                ),
              }}
            />
            <StyledDivider mb="24px" />
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
