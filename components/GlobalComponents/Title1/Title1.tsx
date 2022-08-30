import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { xl as xlSize, md as mdSize } from "../../../constants/windowWidth";

interface IProps {
  className?: string;
  children: ReactNode;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  textAlign?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  md?: IStyledProps;
}

export const Title1: FC<IProps> = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

export const StyledTitle1 = styled(Title1)`
  ${({ color, mb, textAlign, xl, md }: AdaptiveStyledProps) => `
    font-weight: 600;
    font-size: 32px;
    line-height: 1.12;
    letter-spacing: 0.1px;
    color: ${color || "inherit"};
    margin-bottom: ${mb || "16px"};
    text-align: ${textAlign || "left"};
    @media screen and (max-width: ${xlSize}) {
      font-size: 28px;
      line-height: 1.14;
      text-align: ${xl?.textAlign || textAlign || "left"};
    }
    @media screen and (max-width: ${mdSize}) {
      text-align: ${md?.textAlign || xl?.textAlign || textAlign || "left"};
    }
  `}
`;
