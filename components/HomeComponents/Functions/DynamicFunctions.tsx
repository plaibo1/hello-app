import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { useMediaQuery } from "../../../hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Col, Row } from "react-flexbox-grid";
import classes from "./Functions.module.scss";
import { MOC_FUNCTIONS } from "../../../constants/functions";
import useTranslation from "next-translate/useTranslation";

const DynamicFunctions = () => {
  const { t } = useTranslation("home");
  const matches = useMediaQuery("(max-width:765px)");
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [swiper, setSwiper] = useState<any>(null);
  const slideTo = (index: number) => {
    swiper.slideTo(index);
  };
  return (
    <Row>
      {matches ? (
        <Col md={4} xl={6}>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={true}
            loop={true}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 2500 }}
            style={{ paddingBottom: "48px", paddingTop: "24px" }}
            onSwiper={setSwiper}
            onSlideChange={(item) => setActiveSlide(item.realIndex)}
            scrollbar={{ draggable: true }}
            pagination={{
              clickable: true,
              bulletClass: `${classes.swiperBullet}`,
              bulletActiveClass: `${classes.swiperBulletActive}`,
            }}
          >
            {MOC_FUNCTIONS.map((item, index) => {
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
                  <div
                    className={`${classes.sliderItem} ${
                      activeSlide === index ? classes.sliderItemActive : ""
                    }`}
                  >
                    <div className={classes.sliderTitle}>
                      <span className={classes.sliderTitleIcon}>
                        <Image
                          src={item.titleIcon}
                          width={20}
                          height={20}
                          alt="Function icon"
                        />
                      </span>
                      <span className={classes.sliderTitleSpan}>
                        {t(`functions.items.${index}.title`)}
                      </span>
                    </div>
                    <div className={classes.sliderText}>
                      {t(`functions.items.${index}.text`)}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      ) : (
        <>
          <Col md={4} xl={3}>
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
                    {t("functions.items.0.title")}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {t("functions.items.0.text")}
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
                    {t("functions.items.1.title")}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {t("functions.items.1.text")}
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
                    {t("functions.items.2.title")}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {t("functions.items.2.text")}
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} xl={6}>
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              style={{ paddingBottom: "48px", paddingTop: "24px" }}
              onSwiper={setSwiper}
              onSlideChange={(item) => setActiveSlide(item.realIndex)}
              scrollbar={{ draggable: true }}
              modules={[Autoplay]}
              autoplay={{ delay: 2500 }}
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
          <Col md={4} xl={3}>
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
                    {t("functions.items.3.title")}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {t("functions.items.3.text")}
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
                    {t("functions.items.4.title")}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {t("functions.items.4.text")}
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
                    {t("functions.items.5.title")}
                  </span>
                </div>
                <div className={classes.sliderText}>
                  {t("functions.items.5.text")}
                </div>
              </div>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default DynamicFunctions;
