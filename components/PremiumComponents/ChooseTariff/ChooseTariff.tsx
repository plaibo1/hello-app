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
  const { t } = useTranslation("premium");
  const { state } = useContext<any>(Context);
  const currentTariffRef = useRef(state.user.premium.tariff);

  return (
    <section className={classes.wrapper} ref={containerRef}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center" mb="40px" lg={{ mb: "32px" }}>
              {t("chooseTariff.title")}
            </StyledTitle2>
          </Col>
        </Row>
        <div className={classes.tariffs}>
          {MOC_TARIFFS.map((tariff, index) => {
            return (
              tariff.id !== currentTariffRef.current && (
                <TariffCard tariff={tariff} key={tariff.id} />
              )
            );
          })}
        </div>
      </Container>
    </section>
  );
};
