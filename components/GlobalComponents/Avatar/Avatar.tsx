import React, { FC, useState, useContext } from "react";
import Image from "next/image";
import classes from "./Avatar.module.scss";
import Link from "next/link";
import { ProfileModal } from "../../AccountComponents/ProfileModal";
import { Context } from "../../../context";

export const Avatar = () => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const { state } = useContext<any>(Context);

  const profileOpenHandle = () => {
    setProfileOpen(true);
  };
  const profileCloseHandle = () => {
    setProfileOpen(false);
  };
  return (
    <div className={classes.avatarWrapper}>
      <button className={classes.avatarButton} onClick={profileOpenHandle}>
        <div className={classes.imageWrap}>
          <Image
            src={`${
              state.user.data.photo
                ? state.user.data.photo
                : "/images/icons/avatar.svg"
            }`}
            className={classes.avatarIcon}
            height={32}
            width={32}
            alt="icon"
          />
        </div>
      </button>
      <ProfileModal open={profileOpen} onClose={profileCloseHandle} />
    </div>
  );
};
