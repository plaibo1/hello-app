import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledDivider,
  StyledNumericList,
  StyledTitle2,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import classes from "./HowItWork.module.scss";

export const HowItWork = () => {
  const { t } = useTranslation("home");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col lg={8} xl={6}>
            <StyledTitle2
              md={{ textAlign: "center" }}
              dangerouslySetInnerHTML={{
                __html: t("howItWork.title", {
                  interpolation: { escapeValue: false },
                }),
              }}
            />
            <StyledDivider
              mb="40px"
              xl={{ width: "354px" }}
              lg={{ mb: "32px" }}
              md={{ width: "100%" }}
            />
            <StyledNumericList
              items={Array.from({ length: 4 }, (_, idx) =>
                t(`howItWork.items.${idx}`)
              )}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
