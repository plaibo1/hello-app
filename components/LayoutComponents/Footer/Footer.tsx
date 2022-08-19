import React from "react";
import { StyledLink } from "../../GlobalComponents";
import Container from "../Container";
import classes from "./Footer.module.scss";
import { Row, Col } from "react-flexbox-grid";
import { StyledLanguageSwitcher } from "../../GlobalComponents/LanguageSwitcher";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <Row middle="xs">
          <Col lg={2}>
            <StyledLanguageSwitcher />
          </Col>
          <Col lg={5}>
            <div className={classes.copyrightWrapper}>
              <StyledLink href="/policy" fontSize="11px" underline mr="4px">
                Пользовательское соглашение
              </StyledLink>
              <StyledLink href="/policy" fontSize="11px" underline mr="4px">
                Политика конфиденциальности
              </StyledLink>
              © 2022 «Hello» 14+
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
