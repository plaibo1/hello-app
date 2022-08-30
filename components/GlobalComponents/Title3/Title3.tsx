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
  textAlign?: string;
}

export const Title3: FC<IProps> = ({ className, children }) => {
  return <h4 className={className}>{children}</h4>;
};

export const StyledTitle3 = styled(Title3)`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.2px;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  margin-right: ${({ mr }: IStyledProps) => mr || "0px"};
  margin-top: ${({ mt }: IStyledProps) => mt || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
`;
