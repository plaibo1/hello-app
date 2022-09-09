import React, { FC } from "react";
import styled from "styled-components";
import { xl as xlSize, md as mdSize } from "../../../constants/windowWidth";

interface IProps {
  className?: string;
}
interface IStyledProps {
  backgroundColor?: string;
  height?: string;
  mb?: string;
  mt?: string;
  display?: string;
  width?: string;
}
interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  md?: IStyledProps;
}

export const Divider: FC<IProps> = ({ className }) => {
  return <div className={className}></div>;
};

export const StyledDivider = styled(Divider)`
  ${({
    height,
    mb,
    mt,
    backgroundColor,
    display,
    width,
    xl,
    md,
  }: AdaptiveStyledProps) => `
    display: ${display || "block"};
    position: relative;
    width: ${width || "100%"};
    height: ${height || "1px"};
    margin-bottom: ${mb || "16px"};
    margin-top: ${mt || "0px"};
    background-color: ${backgroundColor || "rgba(23, 23, 23, 0.08)"};

    @media screen and (max-width: ${xlSize}) {
      display: ${xl?.display || display || "block"};
      width: ${xl?.width || width || "100%"};
      margin-bottom: ${xl?.mb || mb || "16px"};
    }
    @media (max-width: ${mdSize}) {
      display: ${md?.display || display || "block"};
      width: ${md?.width || width || "100%"};
      margin-bottom: ${md?.mb || mb || "16px"};
    }
  `}
`;
