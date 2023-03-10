import React, { FC, useContext } from "react";
import Image from "next/image";
import classes from "./ProfileModal.module.scss";
import { StyledBody2 } from "../../GlobalComponents";
import { Context } from "../../../context";
import Link from "next/link";
import { ProfileMenu } from "../ProfileMenu";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ProfileModal: FC<IProps> = ({ open, onClose }) => {
  const { t } = useTranslation("common");
  const { state } = useContext<any>(Context);
  return open ? (
    <>
      <div className={classes.profileBack} onClick={onClose}></div>
      <div className={classes.profileClose} onClick={onClose}></div>
      <div className={classes.profileModal}>
        <Link
          href={`/${
            state.user.data.premium || state.user.data.trial
              ? "account"
              : "premium"
          }`}
        >
          <a className={classes.profileMain} onClick={onClose}>
            <div className={classes.imageWrap}>
              <Image
                src={`${
                  state.user.data.photo
                    ? state.user.data.photo
                    : "/images/icons/avatar.svg"
                }`}
                className={classes.avatarIcon}
                height={72}
                width={72}
                alt="icon"
              />
            </div>
            <StyledBody2 textAlign="center" mt="8px">
              {state.user.data.firstName
                ? `${state.user.data.firstName} ${state.user.data.lastName}`
                : t("Имя не указано")}
            </StyledBody2>
          </a>
        </Link>
        <ProfileMenu />
      </div>
    </>
  ) : null;
};
