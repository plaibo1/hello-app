import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { default as NextLink } from "next/link";
import { md as mdSize } from "../../../constants/windowWidth";

interface IProps {
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

interface IStyledProps {
  color?: string;
  mb?: string;
  mr?: string;
  textAlign?: string;
  fontSize?: string;
  underline?: boolean;
  width?: string;
  display?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  md?: IStyledProps;
}

export const Link: FC<IProps> = ({ className, children, href, onClick }) => {
  return (
    <NextLink href={href || ""} onClick={onClick}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};

export const StyledLink = styled(Link)`
  ${({
    fontSize,
    underline,
    color,
    mb,
    mr,
    textAlign,
    width,
    display,
    md,
  }: AdaptiveStyledProps) => `
    font-weight: 400;
    font-size: ${fontSize || "16px"};
    text-decoration: ${underline ? "underline" : "unset"};
    line-height: 1.25;
    letter-spacing: 0.16px;
    color: ${color || "inherit"};
    margin-bottom: ${mb || "0px"};
    margin-right: ${mr || "0px"};
    text-align: ${textAlign || "left"};
    width: ${width || "auto"};
    display: ${display || "inline-block"};
    @media (max-width: ${mdSize}) {
      font-size: ${md?.fontSize || fontSize || "16px"};
      text-decoration: ${md?.underline || underline ? "underline" : "unset"};
      color: ${md?.color || color || "inherit"};
      margin-bottom: ${md?.mb || mb || "0px"};
      margin-right: ${md?.mr || mr || "0px"};
      text-align: ${md?.textAlign || textAlign || "left"};
      width: ${md?.width || width || "auto"};
      display: ${md?.display || display || "inline-block"};
    }
  `}
`;
