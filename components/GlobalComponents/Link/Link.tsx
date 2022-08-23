import React, { FC } from "react";
import styled from "styled-components";
import { default as NextLink } from "next/link";

interface IProps {
  className?: string;
  children: any;
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

export const Link: FC<IProps> = ({ className, children, href, onClick }) => {
  return (
    <NextLink href={href || ""} onClick={onClick}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};

export const StyledLink = styled(Link)`
  font-weight: 400;
  font-size: ${({ fontSize }: IStyledProps) => fontSize || "16px"};
  text-decoration: ${({ underline }: IStyledProps) =>
    underline ? "underline" : "unset"};
  line-height: 1.25;
  letter-spacing: 0.16px;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "0px"};
  margin-right: ${({ mr }: IStyledProps) => mr || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
  width: ${({ width }: IStyledProps) => width || "auto"};
  display: ${({ display }: IStyledProps) => display || "inline-block"};
`;
