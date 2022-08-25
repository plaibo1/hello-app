import React from "react";
import { Col, Row } from "react-flexbox-grid";
import {
  StyledCard,
  StyledDivider,
  StyledTitle2,
} from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./Benefits.module.scss";
import { MOC_BENEFITS } from "../../../constants/benefits";

export const Benefits = () => {
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center">
              Откройте все преимущества <span>Hello Premium</span>
            </StyledTitle2>
            <StyledDivider mb="24px" />
          </Col>
        </Row>
        <Row>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            modules={[Pagination]}
            loop={true}
            slidesPerGroup={4}
            pagination={{
              clickable: true,
              bulletClass: `${classes.swiperBullet}`,
              bulletActiveClass: `${classes.swiperBulletActive}`,
            }}
            scrollbar={{ draggable: true }}
          >
            {MOC_BENEFITS.map((benefit) => {
              return (
                <SwiperSlide key={benefit.title}>
                  <StyledCard
                    icon={
                      <Image
                        src={benefit.icon}
                        height={36}
                        width={36}
                        alt="icon"
                      />
                    }
                    title={benefit.title}
                    text={benefit.text}
                    iconPosition="top"
                    padding="0px"
                    mb="50px"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>
      </Container>
    </section>
  );
};
