import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  children: any;
}

const ContainerWrap: FC<IProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Container = styled(ContainerWrap)`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-right: 8px;
  padding-left: 8px;
  @media (min-width: 1350px) {
    width: 1300px;
    max-width: 100%;
  }
`;
