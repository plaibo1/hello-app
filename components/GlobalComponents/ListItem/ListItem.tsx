import React, { FC } from "react";
import Image from "next/image";
import styled from "styled-components";
import classes from "./ListItem.module.scss";

interface IProps {
  className?: string;
  text: string;
}

interface IStyledProps {
  color?: string;
  mb?: string;
}

export const ListItem: FC<IProps> = ({ className, text }) => {
  return (
    <div className={className}>
      <div className={classes.listIcon}>
        <Image
          src="/images/icons/home_done.svg"
          width={16}
          height={16}
          alt="Check icon"
        />
      </div>
      <div className={classes.listContent}>{text} </div>
    </div>
  );
};

export const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  margin-bottom: ${({ mb }: IStyledProps) => mb || "12px"};
  color: ${({ color }: IStyledProps) => color || "#848592"};
`;
