import React, { FC, useEffect, useState } from 'react'

const useTimer = () => {

  const TIME = 59;

  const [time, setTimer] = useState(TIME);

  useEffect(() => {
    const lastTime = Number(localStorage.getItem('lastTime'));

    if (lastTime) {
      const currentTime = Math.floor(Date.now() / 1000)
      const deltaTime = Number(currentTime - lastTime);

      if (TIME - deltaTime >= 0) {
        setTimer(Number(TIME - deltaTime))
      }
    }
  }, []);

  const tick = () => {
    setTimer(prev => prev - 1)
  }

  const reset = () => {
    setTimer(TIME);
  };

  React.useEffect(() => {
    const timerID = setInterval(tick, 1000);
    if (time === 0 || time < 0) {
      clearInterval(timerID)
    }

    return () => {
      clearInterval(timerID)
    }
  });

  return {
    reset,
    time,
  }
}

export default useTimer