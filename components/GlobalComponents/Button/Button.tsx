import React, { FC } from "react";
import styled from "styled-components";
import { default as NextLink } from "next/link";

interface IProps {
  className?: string;
  children: any;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

interface IStyledProps {
  color?: string;
  mt?: string;
  mb?: string;
  mr?: string;
  ml?: string;
  textAlign?: string;
  fontSize?: string;
  underline?: boolean;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  display?: string;
  padding?: string;
}

export const Button: FC<IProps> = ({
  className,
  children,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const StyledButton = styled(Button)`
  font-weight: 400;
  font-size: ${({ fontSize }: IStyledProps) => fontSize || "16px"};
  text-decoration: ${({ underline }: IStyledProps) =>
    underline ? "underline" : "unset"};
  line-height: 1.25;
  letter-spacing: 0.16px;
  color: ${({ color }: IStyledProps) => color || "inherit"};
  margin-bottom: ${({ mb }: IStyledProps) => mb || "16px"};
  margin-right: ${({ mr }: IStyledProps) => mr || "0px"};
  margin-left: ${({ ml }: IStyledProps) => ml || "0px"};
  margin-top: ${({ mt }: IStyledProps) => mt || "0px"};
  text-align: ${({ textAlign }: IStyledProps) => textAlign || "left"};
  background-color: ${({ backgroundColor }: IStyledProps) =>
    backgroundColor || "#4392BF"};
  padding: ${({ padding }: IStyledProps) => padding || "12px 117px"};
  border: ${({ border }: IStyledProps) => border || "unset"};
  border-radius: ${({ borderRadius }: IStyledProps) => borderRadius || "32px"};
  display: ${({ display }: IStyledProps) => display || "inline-block"};
  cursor: pointer;
  &:disabled {
    background-color: ${({ backgroundColor }: IStyledProps) =>
      backgroundColor ? `${backgroundColor}66` : "#4392BF66"};
  }
`;
