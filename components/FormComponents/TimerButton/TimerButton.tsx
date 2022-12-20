import { StyledButton } from "components/GlobalComponents";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FC } from "react";
import useTimer from "../useTimer/useTimer";

const Timer:FC<{sendNumber: () => Promise<true | undefined>}> = ({ sendNumber }) => {
  const { t } = useTranslation("recovery");
  const { time, reset } = useTimer({ seconds: 20 });

  const sendAgain = () => {
    reset();
    sendNumber();
  }

  const timerComplete = !(time <= 0);

  return (
    <div>
      <StyledButton
        onClick={sendAgain}
        disabled={timerComplete}
        backgroundColor="#ffffff"
        color={timerComplete ? "#4392BF66" : "#4392BF"}
        border={`${timerComplete ? "#4392BF66" : "#4392BF"} 1px solid`}
        mt="12px"
        mb="15px"
        padding="12px 0"
        width="281px"
        textAlign="center"
        md={{ padding: "12px 0px", width: "100%", textAlign: "center" }}
      >
        {t("resendCodeButton")} {time !== 0 ? `00:${time}` : null}
      </StyledButton>
    </div>
  );
};

export default Timer;
