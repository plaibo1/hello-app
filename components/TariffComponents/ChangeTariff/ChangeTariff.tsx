import React, { useContext, useRef } from "react";
import {
  StyledButton,
  StyledDivider,
  StyledSubhead,
  StyledTitle1,
  StyledTitle2,
} from "../../GlobalComponents";
import { Context } from "../../../context";
import Container from "../../LayoutComponents/Container";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";

import classes from "./ChangeTariff.module.scss";
import { MOC_TARIFFS } from "../../../constants/tariffs";
import { TariffCard } from "../TariffCard";

export const ChangeTariff = () => {
  const { t } = useTranslation("common");
  const { state, startTrial } = useContext<any>(Context);
  const currentTariffRef = useRef(state.user.premium.tariff);

  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center" mb="24px">
              {t("Смена тарифа")}
            </StyledTitle2>
          </Col>
        </Row>
        <Row>
          {MOC_TARIFFS.map((tariff) => {
            return (
              tariff.id !== currentTariffRef.current && (
                <Col lg={4} key={tariff.id}>
                  <TariffCard tariff={tariff} />
                </Col>
              )
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
