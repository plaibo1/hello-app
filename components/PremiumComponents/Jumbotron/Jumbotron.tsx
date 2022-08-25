import React, { FC } from "react";
import {
  StyledButton,
  StyledSubhead,
  StyledTitle1,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";

import classes from "./Jumbotron.module.scss";

interface IProps {
  onButtonClick: () => void;
}

export const Jumbotron: FC<IProps> = ({ onButtonClick }) => {
  const { t } = useTranslation("common");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={6}>
            <StyledTitle1>{t("Hello Premium")}</StyledTitle1>
            <StyledSubhead mb="24px">
              {t(
                "Черный список, настройки приватности, безлимитный просмотр профилей и еще множество возможностей."
              )}
            </StyledSubhead>
            <StyledButton
              backgroundColor="white"
              color="#171717"
              padding="12px 46px"
              whiteButton
              onClick={onButtonClick}
            >
              {t("Попробовать бесплатно")}
            </StyledButton>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
