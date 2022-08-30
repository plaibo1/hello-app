import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: any;
}

interface IStyledProps {
  fluid?: boolean;
}

const ContainerWrap: FC<IProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Container = styled(ContainerWrap)`
  ${({ fluid }: IStyledProps) => `
    ${
      fluid
        ? `
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-right: 8px;
    padding-left: 8px;
    width: 100%`
        : `
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-right: 8px;
    padding-left: 8px;
    @media (min-width: 540px) {
      width: 536px;
      max-width: 100%;
    }
    @media (min-width: 730px) {
      width: 728px;
      max-width: 100%;
    }
    @media (min-width: 970px) {
      width: 960px;
      max-width: 100%;
    }
    @media (min-width: 1350px) {
      width: 1300px;
      max-width: 100%;
    }`
    }
  `}
`;
