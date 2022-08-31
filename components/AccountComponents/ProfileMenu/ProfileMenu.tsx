import React, { FC, useContext } from "react";
import Image from "next/image";
import classes from "./ProfileMenu.module.scss";
import { StyledButton } from "../../GlobalComponents";
import { Context } from "../../../context";
import useTranslation from "next-translate/useTranslation";

export const ProfileMenu = () => {
  const { t } = useTranslation("common");
  const { logout } = useContext<any>(Context);
  const handleLogout = async () => {
    await logout();
    if (window.innerWidth < 765) {
      document.querySelector("body")!.style.overflow = "auto";
    }
  };
  return (
    <div className={classes.profileMenu}>
      <StyledButton
        onClick={handleLogout}
        color="#BF434A"
        backgroundColor="unset"
        display="flex"
        mb="0px"
        padding="0px"
      >
        <div className={classes.iconWrap}>
          <Image
            src={`/images/icons/door_arrow.svg`}
            className={classes.linkIcon}
            height={20}
            width={20}
            alt="icon"
          />
        </div>
        {t("Выйти")}
      </StyledButton>
    </div>
  );
};
