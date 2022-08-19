import React from "react";
import { Logo } from "../../GlobalComponents/Logo/Logo";
import Container from "../Container";
import classes from "./Header.module.scss";
import { Grid, Row, Col } from "react-flexbox-grid";

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <Row middle="xs">
          <Col lg={4} lgOffset={4}>
            <Row center="xs">
              <Col lg={12}>
                <Logo />
              </Col>
            </Row>
          </Col>
          <Col lg={4}>
            <Row end="xs">
              <Col lg={12}>Войти</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
