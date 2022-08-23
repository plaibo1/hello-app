import React, { FC } from "react";
import styled from "styled-components";
import classes from "./SubscribeStatus.module.scss";

interface IProps {
  className?: string;
  active: boolean;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  textAlign?: string;
  active: boolean;
}

export const SubscribeStatus: FC<IProps> = ({ className, active }) => {
  return (
    <div className={className}>
      {active ? (
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
          Подписка активна
        </>
      ) : (
        "Подписка отменена"
      )}
    </div>
  );
};

export const StyledSubscribeStatus = styled(SubscribeStatus)`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  letter-spacing: 0.1px;
  color: ${({ active }: IStyledProps) => (active ? "#FFFFFF" : "#848592")};
  background-color: ${({ active }: IStyledProps) =>
    active ? "#1EC287" : "#F8F8F8"};
  padding: 4px 8px;
  border-radius: 32px;
  margin-bottom: ${({ mb }: IStyledProps) => mb || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
  display: inline-block;
`;
