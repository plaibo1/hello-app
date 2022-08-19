import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}
interface IStyledProps {
  backgroundColor?: string;
  height?: string;
  mb?: string;
  mt?: string;
}

export const Divider: FC<IProps> = ({ className }) => {
  return <div className={className}></div>;
};

export const StyledDivider = styled(Divider)`
  display: block;
  position: relative;
  width: 100%;
  height: ${({ height }: IStyledProps) => height || "1px"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  margin-top: ${({ mt }: IStyledProps) => mt || "0px"};
  background-color: ${({ backgroundColor }: IStyledProps) =>
    backgroundColor || "rgba(23, 23, 23, 0.08)"};
`;
