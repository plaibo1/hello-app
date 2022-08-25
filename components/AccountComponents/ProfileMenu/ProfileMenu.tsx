import React, { FC, useContext } from "react";
import Image from "next/image";
import classes from "./ProfileMenu.module.scss";
import { StyledButton } from "../../GlobalComponents";
import { useRouter } from "next/router";
import { Context } from "../../../context";

export const ProfileMenu = () => {
  const { push } = useRouter();
  const { dispatch, logout } = useContext<any>(Context);
  const handleLogout = () => {
    logout();
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
        Выйти
      </StyledButton>
    </div>
  );
};
