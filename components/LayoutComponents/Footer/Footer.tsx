import React from "react";
import { Logo } from "../../GlobalComponents/Logo/Logo";
import Container from "../Container";
import classes from "./Footer.module.scss";
import { Grid, Row, Col } from "react-flexbox-grid";

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <Row>
          <Col lg={2}>Русский</Col>
          <Col lg={5}>
            Пользовательское соглашение Политика конфиденциальности © 2022
            «Hello» 14+
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
