import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import {
  xl as xlSize,
  lg as lgSize,
  md as mdSize,
} from "../../../constants/windowWidth";

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
  mt?: string;
  textAlign?: string;
  lineHeight?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  lg?: IStyledProps;
  md?: IStyledProps;
}

export const Title2: FC<IProps> = ({
  className,
  children,
  dangerouslySetInnerHTML,
}) => {
  return (
    <h2 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      {children}
    </h2>
  );
};

export const StyledTitle2 = styled(Title2)`
  ${({
    color,
    mb,
    mt,
    textAlign,
    lineHeight,
    xl,
    lg,
    md,
  }: AdaptiveStyledProps) => `
    font-weight: 600;
    font-size: 24px;
    line-height: ${lineHeight || "1.12"};
    letter-spacing: 0.1px;
    color: ${color || "inherit"};
    margin-bottom: ${mb || "16px"};
    margin-top: ${mt || "0px"};
    text-align: ${textAlign || "left"};
    & span {
      color: #4392bf;
    }
    @media screen and (max-width: ${xlSize}) {
      text-align: ${xl?.textAlign || textAlign || "left"};
      line-height: ${xl?.lineHeight || lineHeight || "1.12"};
      margin-bottom: ${xl?.mb || mb || "16px"};
    }
    @media screen and (max-width: ${lgSize}) {
      text-align: ${lg?.textAlign || xl?.textAlign || textAlign || "left"};
      line-height: ${lg?.lineHeight || xl?.lineHeight || lineHeight || "1.12"};
      margin-bottom: ${lg?.mb || xl?.mb || mb || "16px"};
    }
    @media screen and (max-width: ${mdSize}) {
      text-align: ${
        md?.textAlign || lg?.textAlign || xl?.textAlign || textAlign || "left"
      };
      line-height: ${
        md?.lineHeight ||
        lg?.lineHeight ||
        xl?.lineHeight ||
        lineHeight ||
        "1.12"
      };
      margin-bottom: ${md?.mb || lg?.mb || xl?.mb || mb || "16px"};
    }
  `}
`;
