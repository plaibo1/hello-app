import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: ReactNode;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  mr?: string;
  mt?: string;
  fontSize?: string;
  textAlign?: string;
}
interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  md?: IStyledProps;
}

export const Title3: FC<IProps> = ({ className, children }) => {
  return <h4 className={className}>{children}</h4>;
};

export const StyledTitle3 = styled(Title3)`
  ${({ color, mb, textAlign, mr, mt, fontSize }: AdaptiveStyledProps) => `
    font-weight: 600;
    font-size: ${fontSize || "16px"};
    line-height: 1.5;
    letter-spacing: 0.2px;
    color: ${color || "inherit"};
    margin-bottom: ${mb || "16px"};
    margin-right: ${mr || "0px"};
    margin-top: ${mt || "0px"};
    text-align: ${textAlign || "left"};
  `}
`;
