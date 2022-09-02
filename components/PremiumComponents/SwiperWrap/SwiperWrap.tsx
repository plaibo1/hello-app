import React from "react";
import Image from "next/image";
import { useMediaQuery } from "../../../hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./SwiperWrap.module.scss";
import { MOC_BENEFITS } from "../../../constants/benefits";
import { Col, Row } from "react-flexbox-grid";
import { StyledCard } from "../../GlobalComponents";

export const SwiperWrap = () => {
  const matches = useMediaQuery("(min-width:1201px)");
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      slidesPerGroup={1}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 2500 }}
      loop={true}
      pagination={{
        clickable: true,
        bulletClass: `${classes.swiperBullet}`,
        bulletActiveClass: `${classes.swiperBulletActive}`,
      }}
      breakpoints={{
        992: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        765: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }}
    >
      {MOC_BENEFITS.map((benefitMap, index) => {
        return (
          <SwiperSlide key={index}>
            <Row>
              {benefitMap.map((benefit) => {
                return (
                  <Col sm={6} key={benefit.title}>
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
                      mb="60px"
                      xl={{ mb: "40px" }}
                    />
                  </Col>
                );
              })}
            </Row>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
