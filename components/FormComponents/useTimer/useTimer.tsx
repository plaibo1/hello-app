import React, { FC } from 'react'

const useTimer = ({seconds}: {seconds: number}) => {

  const [over, setOver] = React.useState(false);

  const [time, setTime] = React.useState(seconds);

  const tick = () => {
    setTime(prev => prev - 1)
  }

  const reset = () => {
    setTime(seconds);
    setOver(false);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    if (time === 0 || time < 0) {
      clearInterval(timerID)
    }
    return () => clearInterval(timerID);
  });

  return {
    time,
    reset,
    over,
    setOver
  }
}

export default useTimer