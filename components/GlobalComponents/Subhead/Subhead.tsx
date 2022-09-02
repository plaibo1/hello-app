import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { xl as xlSize, md as mdSize } from "../../../constants/windowWidth";

interface IProps {
  className?: string;
  children?: ReactNode;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

interface IStyledProps {
  color?: string;
  mb?: string;
  mr?: string;
  mt?: string;
  textAlign?: string;
  textTransform?: string;
  display?: string;
  fontSize?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  md?: IStyledProps;
}

export const Subhead: FC<IProps> = ({
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

export const StyledSubhead = styled(Subhead)`
  ${({
    fontSize,
    display,
    color,
    mb,
    mr,
    mt,
    textAlign,
    textTransform,
    xl,
    md,
  }: AdaptiveStyledProps) => `
    font-weight: 400;
    font-size: ${fontSize || "16px"};
    line-height: 1.12;
    letter-spacing: 0.1px;
    display: ${display || "block"};
    color: ${color || "inherit"};
    margin-bottom: ${mb || "16px"};
    margin-right: ${mr || "0px"};
    margin-top: ${mt || "0px"};
    text-align: ${textAlign || "left"};
    text-transform: ${textTransform || "initial"};
    @media screen and (max-width: ${xlSize}) {
      font-size: ${xl?.fontSize || fontSize || "14px"};
      line-height: 1.29;
      margin-bottom: ${xl?.mb || mb || "16px"};
      text-align: ${xl?.textAlign || textAlign || "left"};
    }
    @media screen and (max-width: ${mdSize}) {
      font-size: ${md?.fontSize || xl?.fontSize || fontSize || "14px"};
      line-height: 1.29;
      margin-bottom: ${xl?.mb || mb || "16px"};
      text-align: ${md?.textAlign || xl?.textAlign || textAlign || "left"};
    }
  `}
`;
