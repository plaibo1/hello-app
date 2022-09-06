import React, { FC, useContext } from "react";
import {
  StyledButton,
  StyledSubhead,
  StyledTitle1,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";

import classes from "./Jumbotron.module.scss";
import { Context } from "context";

interface IProps {
  onButtonClick: () => void;
}

export const Jumbotron: FC<IProps> = ({ onButtonClick }) => {
  const { t } = useTranslation("premium");
  const { state } = useContext<any>(Context);
  const isEndedPremium = () => {
    return (
      state.user.data.trial &&
      !state.user.premium?.autoPayment &&
      state.user.premium?.unactivate === 0
    );
  };
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={6}>
            <StyledTitle1 md={{ textAlign: "center" }}>
              {t("jumbotron.title")}
            </StyledTitle1>
            <StyledSubhead mb="24px" md={{ textAlign: "center" }}>
              {t("jumbotron.subtitle")}
            </StyledSubhead>
            <StyledButton
              backgroundColor="white"
              color="#171717"
              padding="12px 46px"
              mb="12px"
              whiteButton
              onClick={onButtonClick}
            >
              {isEndedPremium()
                ? t("jumbotron.button.withTrial")
                : t("jumbotron.button.withoutTrial")}
            </StyledButton>
            {!isEndedPremium() && (
              <StyledSubhead
                fontSize="12px"
                md={{ textAlign: "center", fontSize: "11px" }}
                dangerouslySetInnerHTML={{
                  __html: t("jumbotron.rulesText", {
                    interpolation: { escapeValue: false },
                  }),
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
