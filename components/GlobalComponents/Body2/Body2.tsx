import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { xl as xlSize } from "../../../constants/windowWidth";

interface IProps {
  className?: string;
  children?: ReactNode;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

interface IStyledProps {
  fontSize?: string;
  color?: string;
  mb?: string;
  mt?: string;
  textAlign?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
}

export const Body2: FC<IProps> = ({
  className,
  children,
  dangerouslySetInnerHTML,
}) => {
  return (
    <p className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      {children}
    </p>
  );
};

export const StyledBody2 = styled(Body2)`
  ${({ fontSize, color, mb, mt, textAlign, xl }: AdaptiveStyledProps) => `
    font-weight: 400;
    font-size: ${fontSize || "14px"};
    line-height: 1.29;
    letter-spacing: 0.16px;
    color: ${color || "inherit"};
    margin-bottom: ${mb || "0px"};
    margin-top: ${mt || "0px"};
    text-align: ${textAlign || "left"};
    & span {
      color: #4392bf;
    }

    @media screen and (max-width: ${xlSize}) {
    font-size: ${xl?.fontSize || fontSize || "14px"};
      color: ${xl?.color || color || "inherit"};
      margin-bottom: ${xl?.mb || mb || "0px"};
      margin-top: ${xl?.mt || mt || "0px"};
      text-align: ${xl?.textAlign || textAlign || "left"};
    }
  `}
`;
