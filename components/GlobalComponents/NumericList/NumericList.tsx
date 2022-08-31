import useTranslation from "next-translate/useTranslation";
import React, { FC } from "react";
import styled from "styled-components";
import classes from "./NumbericList.module.scss";

interface IProps {
  className?: string;
  items: string[];
}

interface IStyledProps {
  color?: string;
  mb?: string;
}

export const NumericList: FC<IProps> = ({ className, items }) => {
  const { t } = useTranslation("common");
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={item} className={classes.listItem}>
          <div className={classes.numberWrapper}>{index + 1}</div>
          <div className={classes.content}>{t(item)}</div>
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
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
`;
