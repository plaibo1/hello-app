import React from "react";
import { Col, Row } from "react-flexbox-grid";
import Image from "next/image";
import { StyledSubhead, StyledTitle2 } from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./Connect.module.scss";
import { DownloadBlock } from "../DownloadBlock";

export const Connect = () => {
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row middle="xs">
          <Col md={5} mdOffset={2}>
            <StyledTitle2>
              Присоединяйтесь к сообществу <span>Hello</span>
            </StyledTitle2>
            <StyledSubhead fontSize="14px" mb="32px">
              Приложение Hello позволит расширить ваши личные и бизнес связи
            </StyledSubhead>
            <DownloadBlock />
          </Col>
          <Col md={3}>
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
