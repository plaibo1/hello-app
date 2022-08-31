import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import classes from "./Card.module.scss";
import { xl as xlSize } from "../../../constants/windowWidth";
import useTranslation from "next-translate/useTranslation";

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
  padding?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
}

export const Card: FC<IProps> = ({
  className,
  text,
  title,
  iconPosition = "left",
  icon,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className={`${className} ${classes[`cardWrapper-${iconPosition}`]}`}>
      {icon && (
        <div className={classes[`iconWrapper-${iconPosition}`]}>{icon}</div>
      )}
      <div className={classes[`cardContent-${iconPosition}`]}>
        {title && (
          <div
            className={`${classes.cardTitle} ${
              classes[`cardTitle-${iconPosition}`]
            }`}
          >
            {t(title)}
          </div>
        )}
        {text && (
          <div
            className={`${classes.cardText} ${
              classes[`cardText-${iconPosition}`]
            }`}
          >
            {t(text)}
          </div>
        )}
      </div>
    </div>
  );
};

export const StyledCard = styled(Card)`
  ${({ padding, color, mb, xl }: AdaptiveStyledProps) => `
    display: flex;
    padding: ${padding || "16px 0px"};
    list-style: none;
    color: ${color || "inherit"};
    margin-bottom: ${mb || "16px"};

    @media screen and (max-width: ${xlSize}) {
      padding: ${xl?.padding || padding || "16px 0px"};
      color: ${xl?.color || color || "inherit"};
      margin-bottom: ${xl?.mb || mb || "16px"};
    }
  `}
`;
