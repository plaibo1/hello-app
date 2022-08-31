import React, { FC } from "react";
import Image from "next/image";
import styled from "styled-components";
import classes from "./ListItem.module.scss";
import { xl as xlSize } from "../../../constants/windowWidth";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  className?: string;
  text: string;
}

interface IStyledProps {
  color?: string;
  mb?: string;
}

interface AdaptiveStyledProps extends IStyledProps {
  xl?: IStyledProps;
}

export const ListItem: FC<IProps> = ({ className, text }) => {
  const { t } = useTranslation("common");
  return (
    <div className={className}>
      <div className={classes.listIcon}>
        <Image
          src="/images/icons/home_done.svg"
          width={16}
          height={16}
          alt="Check icon"
        />
      </div>
      <div className={classes.listContent}>{t(text)} </div>
    </div>
  );
};

export const StyledListItem = styled(ListItem)`
  ${({ color, mb, xl }: AdaptiveStyledProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    margin-bottom: ${mb || "12px"};
    color: ${color || "#848592"};
    @media screen and (max-width: ${xlSize}) {
      margin-bottom: ${xl?.mb || mb || "12px"};
      color: ${xl?.color || color || "#848592"};
    }
  `}
`;
