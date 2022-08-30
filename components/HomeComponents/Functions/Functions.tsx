import React from "react";
import { Col, Row } from "react-flexbox-grid";
import { StyledDivider, StyledTitle2 } from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import classes from "./Functions.module.scss";
import dynamic from "next/dynamic";

const DynamicFunctions = dynamic(() => import("./DynamicFunctions") as any, {
  ssr: false,
});

export const Functions = () => {
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center">
              Основные функции и возможности
            </StyledTitle2>
            <StyledDivider mb="0px" />
          </Col>
        </Row>
        <Row between="xl" center="xs">
          <Col md={12} lg={10} xl={12}>
            <DynamicFunctions />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
