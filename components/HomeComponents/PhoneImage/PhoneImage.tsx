import React, { FC } from "react";
import Image from "next/image";
import classes from "./PhoneImage.module.scss";
import { animated } from "react-spring";

const BIG_ID = [2, 4, 6, 8, 11, 15, 17, 20, 21, 23];

export const PhoneImage: FC = () => {
  const images = () => {
    let imagesArray = [];
    for (let i = 0; i < 24; i++) {
      imagesArray.push(
        <div
          key={i}
          className={[
            classes[BIG_ID.includes(i + 1) ? "bigImage" : "miniImage"],
            classes[`image-${i + 1}`],
            classes[`animate${(i + 1) % 2 === 0 ? "Up" : "Down"}`],
          ].join(" ")}
        >
          <Image
            src={`/images/phone_banner/onboard_img_element-${i + 1}.png`}
            layout="fill"
            alt="Header image"
          />
        </div>
      );
    }
    return imagesArray;
  };
  return (
    <div className={classes.jumbotronImageWrap}>
      <div className={classes.jumbotronImage}>
        <Image
          src="/images/phone_banner/mockup.png"
          layout="fill"
          alt="Header image"
          priority
        />
      </div>
      {images()}
    </div>
  );
};
