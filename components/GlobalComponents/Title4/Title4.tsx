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

export const Title4: FC<IProps> = ({ className, children }) => {
  return <h4 className={className}>{children}</h4>;
};

export const StyledTitle4 = styled(Title4)`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.2px;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
`;
