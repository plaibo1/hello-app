import React from "react";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledDivider,
  StyledTitle2,
  StyledCard,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import Image from "next/image";
import classes from "./Benefits.module.scss";
import { MOC_BENEFITS } from "../../../constants/benefits";

export const Benefits = () => {
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center">
              Откройте все преимущества <span>Hello Premium</span>
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
  );
};
