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
import useTranslation from "next-translate/useTranslation";

export const SwiperWrap = () => {
  const { t } = useTranslation("account");
  const matches = useMediaQuery("(min-width:1201px)");
  return matches ? (
    MOC_BENEFITS.map((benefitMap, index) =>
      benefitMap.map((benefit, benefitIndex) => (
        <Col md={3} key={benefit.title}>
          <StyledCard
            icon={
              <Image src={benefit.icon} height={36} width={36} alt="icon" />
            }
            title={t(`benefits.items.${index * 2 + benefitIndex}.title`)}
            text={t(`benefits.items.${index * 2 + benefitIndex}.text`)}
            iconPosition="top"
            padding="0px"
            mb="50px"
          />
        </Col>
      ))
    )
  ) : (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 2500 }}
      loop={true}
      slidesPerGroup={1}
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
              {benefitMap.map((benefit, benefitIndex) => {
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
                      title={t(
                        `benefits.items.${index * 2 + benefitIndex}.title`
                      )}
                      text={t(
                        `benefits.items.${index * 2 + benefitIndex}.text`
                      )}
                      iconPosition="top"
                      padding="0px"
                      mb="60px"
                      xl={{ mb: "40px", padding: "0px 5px" }}
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
