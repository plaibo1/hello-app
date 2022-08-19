import React from "react";
import Image from "next/image";
import classes from "./Avatar.module.scss";

export const Avatar = () => {
  return (
    <div className={classes.avatarWrapper}>
      <Image
        src={`/images/icons/avatar.svg`}
        className={classes.avatarIcon}
        height={32}
        width={32}
        alt="icon"
      />
    </div>
  );
};
