import React, { FC } from "react";
import Image from "next/image";
import classes from "./DownloadBlock.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

interface IProps {
  color?: "white" | "black";
}

export const DownloadBlock: FC<IProps> = ({ color = "black" }) => {
  const { t } = useTranslation("home");
  const { locale } = useRouter()

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
          {t("jumbotron.qrText")}
        </p>
        <div className={classes.storesWrap}>
          <div className={classes.storeItem}>
            <Image
              src={`/images/app_store${locale === "en" ? "_en.svg" : "_ru.svg"}`}
              layout="fill"
              alt="App store link"
            />
          </div>
          <div className={classes.storeItem}>
            <Image
              src={`/images/google_play${locale === "en" ? "_en.svg" : "_ru.png"}`}
              layout="fill"
              alt="App store link"
            />
          </div>
          <div className={classes.storeItem}>
            <Image
              src={`/images/rustore${locale === "en" ? "_en.svg" : ".svg"}`}
              layout="fill"
              alt="ru store store link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
