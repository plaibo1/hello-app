import useTranslation from "next-translate/useTranslation";
import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import classes from "./SubscribeStatus.module.scss";

interface IProps {
  className?: string;
  active: string;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  textAlign?: string;
  active: string;
}

interface StatusType {
  [key: string]: ReactElement | string;
  active: ReactElement;
  stopped: string;
  paused: string;
}

type StatusFunc = () => StatusType;

const StatusObject: StatusFunc = () => {
  const { t } = useTranslation("account");
  return {
    active: (
      <>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={classes.subscribeDone}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 6.5L4.66667 9L10 4"
            stroke="white"
            strokeLinecap="round"
          />
        </svg>
        {t("statusBar.tariffStatus.active")}
      </>
    ),
    stopped: t("statusBar.tariffStatus.canceled"),
    paused: t("statusBar.tariffStatus.paused"),
  };
};

export const SubscribeStatus: FC<IProps> = ({ className, active }) => {
  return <div className={className}>{StatusObject()[active]}</div>;
};

export const StyledSubscribeStatus = styled(SubscribeStatus)`
  ${({ active, mb, textAlign }: IStyledProps) => {
    const isActive = active === "active";
    return `
    font-weight: 400;
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: 0.1px;
    color: ${isActive ? "#FFFFFF" : "#848592"};
    background-color: ${isActive ? "#1EC287" : "#F8F8F8"};
    padding: 4px 8px;
    border-radius: 32px;
    margin-bottom: ${mb || "0px"};
    text-align: ${textAlign || "left"};
    display: inline-block;
  `;
  }}
`;
