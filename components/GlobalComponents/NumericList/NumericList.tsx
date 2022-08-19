import React, { FC } from "react";
import styled from "styled-components";
import classes from "./NumbericList.module.scss";

interface IProps {
  className?: string;
  items: string[];
}

interface ISyledProps {
  color?: string;
  mb?: string;
}

export const NumericList: FC<IProps> = ({ className, items }) => {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={item} className={classes.listItem}>
          <div className={classes.numberWrapper}>{index}</div>
          <div className={classes.content}>{item}</div>
        </li>
      ))}
    </ul>
  );
};

export const StyledNumericList = styled(NumericList)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  list-style: none;
  color: ${({ color }: ISyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: ISyledProps) => mb || "16px"};
`;
