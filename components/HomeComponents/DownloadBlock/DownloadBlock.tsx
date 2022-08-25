import React, { FC } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./DownloadBlock.module.scss";

interface IProps {
  color: "white" | "black";
}

export const DownloadBlock = ({ color = "black" }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.qrWrap}>
        <div className={classes.qr}>
          <Image src="/images/qr.png" layout="fill" alt="QR Code" />
        </div>
      </div>
      <div className={classes.contentWrap}>
        <p
          className={classes.downloadTitle}
          style={{ color: color === "black" ? "#171717" : "white" }}
        >
          Наведите камеру на QR-код, чтобы скачать
        </p>
        <div className={classes.storesWrap}>
          <div className={classes.storeItem}>
            <Image
              src="/images/app_store.svg"
              layout="fill"
              alt="App store link"
            />
          </div>
          <div className={classes.storeItem}>
            <Image
              src="/images/google_play.png"
              layout="fill"
              alt="App store link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
