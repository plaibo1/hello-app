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

export const Subhead: FC<IProps> = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

export const StyledSubhead = styled(Subhead)`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.12;
  letter-spacing: 0.1px;
  color: ${(props: ISyledProps) => props.color || "inherit"};
  margin-bottom: ${({ mb }: ISyledProps) => mb || "16px"};
  text-align: ${({ textAlign }: ISyledProps) => textAlign || "left"};
`;
