import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: any;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  mt?: string;
  textAlign?: string;
}

export const Title2: FC<IProps> = ({ className, children }) => {
  return <h2 className={className}>{children}</h2>;
};

export const StyledTitle2 = styled(Title2)`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.12;
  letter-spacing: 0.1px;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  margin-top: ${({ mt }: IStyledProps) => mt || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
  & span {
    color: #4392bf;
  }
`;
