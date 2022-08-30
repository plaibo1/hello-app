import React, { useContext, useRef, FC, RefObject } from "react";
import { StyledTitle2 } from "../../GlobalComponents";
import { Context } from "../../../context";
import Container from "../../LayoutComponents/Container";
import { Row, Col } from "react-flexbox-grid";
import useTranslation from "next-translate/useTranslation";

import classes from "./ChooseTariff.module.scss";
import { MOC_TARIFFS } from "../../../constants/tariffs";
import { TariffCard } from "../TariffCard";

interface IProps {
  containerRef: RefObject<HTMLElement>;
}

export const ChooseTariff: FC<IProps> = ({ containerRef }) => {
  const { t } = useTranslation("common");
  const { state } = useContext<any>(Context);
  const currentTariffRef = useRef(state.user.premium.tariff);

  return (
    <section className={classes.wrapper} ref={containerRef}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center" mb="24px">
              {t("Выберите свой тариф")}
            </StyledTitle2>
          </Col>
        </Row>
        <Row>
          {MOC_TARIFFS.map((tariff, index) => {
            return (
              tariff.id !== currentTariffRef.current && (
                <Col md={(index + 1) % 3 === 0 ? 12 : 6} lg={4} key={tariff.id}>
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
