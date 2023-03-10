import React, { useContext } from "react";
import { Col, Row } from "react-flexbox-grid";
import { StyledDivider, StyledTitle2 } from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./Benefits.module.scss";
import dynamic from "next/dynamic";
import { Context } from "../../../context";
import useTranslation from "next-translate/useTranslation";

const DynamicSwiper = dynamic(() => import("../SwiperWrap/") as any, {
  ssr: false,
});

export const Benefits = () => {
  const { t } = useTranslation("account");
  const { state } = useContext<any>(Context);
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            {state.user.data.premium ? (
              <StyledTitle2
                textAlign="center"
                dangerouslySetInnerHTML={{
                  __html: t("benefits.title.withPremium", {
                    interpolation: { escapeValue: false },
                  }),
                }}
              />
            ) : (
              <StyledTitle2
                textAlign="center"
                dangerouslySetInnerHTML={{
                  __html: t("benefits.title.withoutPremium", {
                    interpolation: { escapeValue: false },
                  }),
                }}
              />
            )}
            <StyledDivider mb="40px" />
          </Col>
        </Row>
        <Row>
          <DynamicSwiper />
        </Row>
      </Container>
    </section>
  );
};
