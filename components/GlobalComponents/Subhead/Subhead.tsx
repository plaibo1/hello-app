import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: any;
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

export const Subhead: FC<IProps> = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

export const StyledSubhead = styled(Subhead)`
  font-weight: 400;
  font-size: ${({ fontSize }: IStyledProps) => fontSize || "16px"};
  line-height: 1.12;
  letter-spacing: 0.1px;
  display: ${({ display }: IStyledProps) => display || "block"};
  color: ${(props: IStyledProps) => props.color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  margin-right: ${({ mr }: IStyledProps) => mr || "0px"};
  margin-top: ${({ mt }: IStyledProps) => mt || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
  text-transform: ${({ textTransform }: IStyledProps) =>
    textTransform || "initial"};
`;
