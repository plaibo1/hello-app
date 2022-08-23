import React, { FC, useState } from "react";
import Image from "next/image";
import classes from "./Avatar.module.scss";
import Link from "next/link";
import { ProfileModal } from "../../AccountComponents/ProfileModal";

export const Avatar = () => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const profileOpenHandle = () => {
    setProfileOpen((prevState) => !prevState);
  };
  return (
    <div className={classes.avatarWrapper}>
      <button className={classes.avatarButton} onClick={profileOpenHandle}>
        <Image
          src={`/images/icons/avatar.svg`}
          className={classes.avatarIcon}
          height={32}
          width={32}
          alt="icon"
        />
        <ProfileModal open={profileOpen} />
      </button>
    </div>
  );
};
