import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: any;
}

interface ISyledProps {
  color?: string;
  mb?: string;
  textAlign?: string;
}

export const Title1: FC<IProps> = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

export const StyledTitle1 = styled(Title1)`
  font-weight: 600;
  font-size: 32px;
  line-height: 1.12;
  letter-spacing: 0.1px;
  color: ${({ color }: ISyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: ISyledProps) => mb || "16px"};
  text-align: ${({ textAlign }: ISyledProps) => textAlign || "left"};
`;
