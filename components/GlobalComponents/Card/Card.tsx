import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import classes from "./Card.module.scss";

interface IProps {
  className?: string;
  iconPosition?: string;
  icon?: ReactNode;
  title?: string;
  text?: string;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  iconPosition?: string;
}

export const Card: FC<IProps> = ({
  className,
  text,
  title,
  iconPosition = "left",
  icon,
}) => {
  return (
    <div className={`${className} ${classes[`cardWrapper-${iconPosition}`]}`}>
      {icon && (
        <div className={classes[`iconWrapper-${iconPosition}`]}>{icon}</div>
      )}
      <div className={classes[`cardContent-${iconPosition}`]}>
        {title && (
          <div className={classes[`cardTitle-${iconPosition}`]}>{title}</div>
        )}
        {text && (
          <div className={classes[`cardText-${iconPosition}`]}>{text}</div>
        )}
      </div>
    </div>
  );
};

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: ${({ iconPosition = "left" }: IStyledProps) => iconPosition};
  justify-content: center;
  padding: 16px 0px;
  list-style: none;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
`;
