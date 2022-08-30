import React from "react";
import { Col, Row } from "react-flexbox-grid";
import Image from "next/image";
import { StyledSubhead, StyledTitle2 } from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import classes from "./Connect.module.scss";
import { DownloadBlock } from "../DownloadBlock";

export const Connect = () => {
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row middle="xs">
          <Col lg={6} lgOffset={3} xl={5} xlOffset={2}>
            <StyledTitle2 xl={{ textAlign: "center" }}>
              Присоединяйтесь к сообществу <span>Hello</span>
            </StyledTitle2>
            <StyledSubhead
              fontSize="14px"
              mb="32px"
              xl={{ textAlign: "center" }}
            >
              Приложение Hello позволит расширить ваши личные и бизнес связи
            </StyledSubhead>
            <DownloadBlock />
          </Col>
          <Col lg={6} lgOffset={3} xl={3} first="xs" last="xl" xlOffset={0}>
            <div className={classes.imageWrap}>
              <Image
                src="/images/connect_image.png"
                layout="fill"
                alt="Connect to community"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
