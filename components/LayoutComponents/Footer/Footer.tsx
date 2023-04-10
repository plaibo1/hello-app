import React from "react";
import { StyledLink, StyledLanguageSwitcher } from "../../GlobalComponents";
import { default as NextLink } from "next/link";
import "rc-dialog/assets/index.css";
import Container from "../Container";
import classes from "./Footer.module.scss";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";

const Footer = () => {
  const { t } = useTranslation("layout");

  return (
    <footer className={classes.footer}>
      <Container>
        <Row middle="xs">
          <Col md={2}>
            <StyledLanguageSwitcher />
          </Col>
          <Col md={8} xl={5}>
            <div className={classes.copyrightWrapper}>
              <NextLink href="/user_agreement">
                <StyledLink
                  fontSize="11px"
                  underline
                  mr="4px"
                  md={{ mb: "4px" }}
                >
                  {t("footer.termsOfUse")}
                </StyledLink>
              </NextLink>

              <NextLink href="/privacy_policy">
                <StyledLink
                  fontSize="11px"
                  underline
                  mr="4px"
                  md={{ mb: "4px" }}
                >
                  {t("footer.privacyPolicy")}
                </StyledLink>
              </NextLink>
              <span>
                {" "}
                © {`${new Date().getFullYear()}`} {t("footer.copyright")}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
