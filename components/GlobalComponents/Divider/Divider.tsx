import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}
interface ISyledProps {
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
  height: ${({ height }: ISyledProps) => height || "1px"};
  margin-bottom: ${({ mb }: ISyledProps) => mb || "16px"};
  margin-top: ${({ mt }: ISyledProps) => mt || "0px"};
  background-color: ${({ backgroundColor }: ISyledProps) =>
    backgroundColor || "rgba(23, 23, 23, 0.08)"};
`;
