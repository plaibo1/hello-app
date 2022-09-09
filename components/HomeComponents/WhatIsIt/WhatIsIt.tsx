import React from "react";
import Image from "next/image";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledCard,
  StyledDivider,
  StyledTitle2,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import classes from "./WhatIsIt.module.scss";
import useTranslation from "next-translate/useTranslation";
import { WII_ITEMS } from "constants/whatIsIt";

export const WhatIsIt = () => {
  const { t } = useTranslation("home");
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2
              textAlign="center"
              dangerouslySetInnerHTML={{
                __html: t("whatIsIt.title", {
                  interpolation: { escapeValue: false },
                }),
              }}
            />
            <StyledDivider mb="24px" />
            <Row>
              {WII_ITEMS.map((item, index) => {
                return (
                  <Col md={6} key={item.title}>
                    <StyledCard
                      icon={
                        <Image
                          src={item.icon}
                          height={36}
                          width={36}
                          alt="icon"
                        />
                      }
                      title={t(`whatIsIt.items.${index}.title`)}
                      text={t(`whatIsIt.items.${index}.text`)}
                      mb="24px"
                      xl={{ mb: "0px" }}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
