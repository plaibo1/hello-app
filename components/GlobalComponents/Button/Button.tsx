import React, { FC } from "react";
import styled from "styled-components";
import { xl as xlSize, md as mdSize } from "../../../constants/windowWidth";
interface IProps {
  className?: string;
  children: any;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: any;
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
  gradientBackground?: boolean;
  blueButton?: boolean;
  whiteButton?: boolean;
  width?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
  md?: IStyledProps;
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
  ${({
    fontSize,
    underline,
    color,
    mb,
    mr,
    ml,
    mt,
    textAlign,
    backgroundColor,
    padding,
    border,
    borderRadius,
    display,
    gradientBackground,
    blueButton,
    whiteButton,
    xl,
    md,
    width,
  }: AdaptiveStyledProps) => `
  font-weight: 400;
  max-width: 100%;
  font-size: ${fontSize || "16px"};
  text-decoration: ${underline ? "underline" : "unset"};
  line-height: 1.25;
  letter-spacing: 0.16px;
  color: ${color || "inherit"};
  margin-bottom: ${mb || "16px"};
  margin-right: ${mr || "0px"};
  margin-left: ${ml || "0px"};
  margin-top: ${mt || "0px"};
  text-align: ${textAlign || "left"};
  padding: ${padding || "12px 117px"};
  border: ${border || "unset"};
  border-radius: ${borderRadius || "32px"};
  display: ${display || "inline-block"};
  cursor: pointer;
  width: ${width || "auto"};
  ${
    gradientBackground
      ? `
      transition: 0.3s;
    background: linear-gradient(112.34deg, #4375BF 0%, #45B7D0 30%, #45B7D0 70%, #4375BF 100%), #3664A9;
    background-size: 200% 100%;
    background-position: 00% 50%;
    &:hover {
      background-position: 100% 50%;
    }
    &:focus {
      background: #3664A9;
    }
    &:active {
      background: #4392BF;
    }
    `
      : blueButton
      ? `
    background-color: #4392BF;
    color: white;
    &:hover {
      background-color: #397EA6;
      color: white;
    }
    &:focus {
      background-color: #397EA6;
      color: white;
    }
    &:active {
      background-color: #57AFE0;
      color: white;
    }
    &:disabled {
      background-color: "#4392BF66";
    }`
      : whiteButton
      ? `
    background-color: #FFFFFF;
    color: #171717;
    &:hover {
      background-color: #F5F5F5;
      color: #171717;
    }
    &:focus {
      background-color: #F5F5F5;
      color: #171717;
    }
    &:active {
      background-color: #E6E6E6;
      color: #171717;
    }
    &:disabled {
      background-color: #FFFFFF66;
    }`
      : `
    background-color: ${backgroundColor || "#4392BF"};
    &:disabled {
      background-color: ${
        backgroundColor ? `${backgroundColor}66` : "#4392BF66"
      };
    }
  `
  }
  @media screen and (max-width: ${xlSize}) {
    font-size: ${xl?.fontSize || fontSize || "15px"};
    line-height: 1.33;
    margin-bottom: ${xl?.mb || mb || "16px"};
    padding: ${xl?.padding || padding || "12px 117px"};
    width: ${xl?.width || width || "auto"};
    text-align: ${xl?.textAlign || textAlign || "left"};
  }
  @media screen and (max-width: ${mdSize}) {
    font-size: ${md?.fontSize || xl?.fontSize || fontSize || "15px"};
    line-height: 1.33;
    margin-bottom: ${md?.mb || xl?.mb || mb || "16px"};
    padding: ${md?.padding || xl?.padding || padding || "12px 117px"};
    width: ${md?.width || xl?.width || width || "auto"};
    text-align: ${md?.textAlign || xl?.textAlign || textAlign || "left"};
  }
  `}
`;
