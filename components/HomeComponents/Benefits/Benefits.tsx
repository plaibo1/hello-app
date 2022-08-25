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
import { HOME_BENEFITS } from "../../../constants/benefits";
import { useRouter } from "next/router";

export const Benefits = () => {
  const { push } = useRouter();
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center" mb="24px">
              Больше возможностей с подпиской <span>Premium</span>
            </StyledTitle2>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3}>
            <div className={classes.imageWrap}>
              <Image
                src="/images/mockup_premium_rs.png"
                layout="fill"
                alt="Benefit image"
              />
            </div>
            <StyledDivider />
            <Row>
              <Col md={6}>
                {HOME_BENEFITS.slice(0, 3).map((benefit) => {
                  return <StyledListItem key={benefit} text={benefit} />;
                })}
              </Col>
              <Col md={6}>
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
            <StyledBody2 textAlign="center" color="#848592" mb="20px">
              Получите <span>Premium бесплатно</span> на 1 месяц и получите
              новый опыт взаимодействия с приложением.
            </StyledBody2>
            <StyledButton
              color="white"
              padding="12px 100.5px"
              ml="auto"
              mr="auto"
              display="block"
              gradientBackground
              onClick={() => push("/premium")}
            >
              Подробнее
            </StyledButton>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
