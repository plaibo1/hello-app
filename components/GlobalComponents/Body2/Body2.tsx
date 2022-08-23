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

export const Body2: FC<IProps> = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

export const StyledBody2 = styled(Body2)`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.29;
  letter-spacing: 0.16px;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "0px"};
  margin-top: ${({ mt }: IStyledProps) => mt || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
`;
