import React from "react";
import { StyledLink, StyledLanguageSwitcher } from "../../GlobalComponents";
import Container from "../Container";
import classes from "./Footer.module.scss";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className={classes.footer}>
      <Container>
        <Row middle="xs">
          <Col md={2}>
            <StyledLanguageSwitcher />
          </Col>
          <Col md={8} xl={5}>
            <div className={classes.copyrightWrapper}>
              <StyledLink
                href="/policy"
                fontSize="11px"
                underline
                mr="4px"
                md={{ mb: "4px" }}
              >
                {t("Пользовательское соглашение")}
              </StyledLink>
              <StyledLink
                href="/policy"
                fontSize="11px"
                underline
                mr="4px"
                md={{ mb: "4px" }}
              >
                {t("Политика конфиденциальности")}
              </StyledLink>
              <span>{t("© 2022 «Hello» 14+")}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
