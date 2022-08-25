import React, { useState } from "react";
import { Col, Row } from "react-flexbox-grid";
import { StyledDivider, StyledTitle2 } from "../../GlobalComponents";
import Container from "../../LayoutComponents/Container";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./Functions.module.scss";
import { MOC_FUNCTIONS } from "../../../constants/functions";

export const Functions = () => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [swiper, setSwiper] = useState<any>(null);
  const slideTo = (index: number) => {
    swiper.slideTo(index);
  };
  return (
    <section className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={12}>
            <StyledTitle2 textAlign="center">
              Основные функции и возможности
            </StyledTitle2>
            <StyledDivider mb="0px" />
          </Col>
        </Row>
        <Row between="xs">
          <Col md={3}>
            <div className={classes.sliderColumn}>
              <div
                className={`${classes.sliderItem} ${
                  activeSlide === 0 ? classes.sliderItemActive : ""
                }`}
                onClick={() => slideTo(1)}
              >
                <div className={classes.sliderTitle}>
                  <span className={classes.sliderTitleIcon}>
                    <Image
                      src={MOC_FUNCTIONS[0].titleIcon}
                      width={20}
                      height={20}
                      alt="Function icon"
                    />
                  </span>
                  <span className={classes.sliderTitleSpan}>
                    {MOC_FUNCTIONS[0].title}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {MOC_FUNCTIONS[0].description}
                </div>
              </div>
              <div
                className={`${classes.sliderItem} ${
                  activeSlide === 1 ? classes.sliderItemActive : ""
                }`}
                onClick={() => slideTo(2)}
              >
                <div className={classes.sliderTitle}>
                  <span className={classes.sliderTitleIcon}>
                    <Image
                      src={MOC_FUNCTIONS[1].titleIcon}
                      width={20}
                      height={20}
                      alt="Function icon"
                    />
                  </span>
                  <span className={classes.sliderTitleSpan}>
                    {MOC_FUNCTIONS[1].title}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {MOC_FUNCTIONS[1].description}
                </div>
              </div>
              <div
                className={`${classes.sliderItem} ${
                  activeSlide === 2 ? classes.sliderItemActive : ""
                }`}
                onClick={() => slideTo(3)}
              >
                <div className={classes.sliderTitle}>
                  <span className={classes.sliderTitleIcon}>
                    <Image
                      src={MOC_FUNCTIONS[2].titleIcon}
                      width={20}
                      height={20}
                      alt="Function icon"
                    />
                  </span>
                  <span className={classes.sliderTitleSpan}>
                    {MOC_FUNCTIONS[2].title}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {MOC_FUNCTIONS[2].description}
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              style={{ paddingBottom: "48px", paddingTop: "24px" }}
              onSwiper={setSwiper}
              onSlideChange={(item) => setActiveSlide(item.realIndex)}
              scrollbar={{ draggable: true }}
            >
              {MOC_FUNCTIONS.map((item) => {
                return (
                  <SwiperSlide key={item.title}>
                    <div className={classes.sliderImage}>
                      <Image
                        src={item.phoneImage}
                        width={220}
                        height={450}
                        alt="Function image"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
          <Col md={3}>
            <div className={classes.sliderColumn}>
              <div
                className={`${classes.sliderItem} ${
                  activeSlide === 3 ? classes.sliderItemActive : ""
                }`}
                onClick={() => slideTo(4)}
              >
                <div className={classes.sliderTitle}>
                  <span className={classes.sliderTitleIcon}>
                    <Image
                      src={MOC_FUNCTIONS[3].titleIcon}
                      width={20}
                      height={20}
                      alt="Function icon"
                    />
                  </span>
                  <span className={classes.sliderTitleSpan}>
                    {MOC_FUNCTIONS[3].title}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {MOC_FUNCTIONS[3].description}
                </div>
              </div>
              <div
                className={`${classes.sliderItem} ${
                  activeSlide === 4 ? classes.sliderItemActive : ""
                }`}
                onClick={() => slideTo(5)}
              >
                <div className={classes.sliderTitle}>
                  <span className={classes.sliderTitleIcon}>
                    <Image
                      src={MOC_FUNCTIONS[4].titleIcon}
                      width={20}
                      height={20}
                      alt="Function icon"
                    />
                  </span>
                  <span className={classes.sliderTitleSpan}>
                    {MOC_FUNCTIONS[4].title}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {MOC_FUNCTIONS[4].description}
                </div>
              </div>
              <div
                className={`${classes.sliderItem} ${
                  activeSlide === 5 ? classes.sliderItemActive : ""
                }`}
                onClick={() => slideTo(6)}
              >
                <div className={classes.sliderTitle}>
                  <span className={classes.sliderTitleIcon}>
                    <Image
                      src={MOC_FUNCTIONS[5].titleIcon}
                      width={20}
                      height={20}
                      alt="Function icon"
                    />
                  </span>
                  <span className={classes.sliderTitleSpan}>
                    {MOC_FUNCTIONS[5].title}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {MOC_FUNCTIONS[5].description}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
