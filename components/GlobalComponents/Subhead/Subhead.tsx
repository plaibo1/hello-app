import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: any;
}

interface IStyledProps {
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
  color: ${(props: IStyledProps) => props.color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
`;
