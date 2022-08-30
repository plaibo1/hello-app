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
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col lg={8} xl={6}>
            <StyledTitle2 md={{ textAlign: "center" }}>
              Как работает <span>Hello</span>
            </StyledTitle2>
            <StyledDivider mb="24px" xl={{ width: "354px" }} />
            <StyledNumericList
              items={[
                "Скачайте приложение на телефон",
                "Зарегистрируйтесь и создайте личный или бизнес профиль",
                "Включите bluetooth и начните искать интересных людей поблизости ",
                "Расширяйте сообщество Hello, рассказывая о нас друзьям и коллегам",
              ]}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
