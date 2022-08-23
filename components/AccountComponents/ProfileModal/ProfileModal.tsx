import React, { FC, useContext } from "react";
import Image from "next/image";
import classes from "./ProfileModal.module.scss";
import { StyledBody2 } from "../../GlobalComponents/Body2";
import { Context } from "../../../context";
import Link from "next/link";
import { ProfileMenu } from "../ProfileMenu";

interface IProps {
  open: boolean;
}

export const ProfileModal: FC<IProps> = ({ open }) => {
  const { state } = useContext<any>(Context);
  return open ? (
    <div className={classes.profileModal}>
      <Link href="/account">
        <a className={classes.profileMain}>
          <Image
            src={`/images/icons/avatar.svg`}
            className={classes.avatarIcon}
            height={72}
            width={72}
            alt="icon"
          />
          <StyledBody2 textAlign="center" mt="8px">
            {state.user.data.firstName
              ? `${state.user.data.firstName} ${state.user.data.lastName}`
              : "Тест Тестов"}
          </StyledBody2>
        </a>
      </Link>
      <ProfileMenu />
    </div>
  ) : null;
};
