import React, { useState, useEffect } from 'react';

const PollCountdown = (props) => {
  const [timeStr, setTimeStr] = useState('');
  let timeRemaining = 1;

  const updateTime = () => {
    timeRemaining = new Date(Date.parse(props.deadline) - Date.now());
    const daysRemaining = timeRemaining / (1000 * 60 * 60 * 24);
    let newTimeStr =
      daysRemaining >= 2
        ? `${Math.floor(daysRemaining)} Days, `
        : `${Math.floor(daysRemaining)} Day, `;
    newTimeStr = daysRemaining < 1 ? '' : newTimeStr;
    newTimeStr += Date.parse(timeRemaining) > 0 ? timeRemaining.toISOString().substr(11, 8) : '00:00:00';

    setTimeStr(newTimeStr);
  };

  useEffect(() => {
    let timer;
    updateTime();
    if (Date.parse(timeRemaining) > 0) {
      timer = setInterval(() => {
        updateTime();
        if (Date.parse(timeRemaining) <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    }

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return <small className='text-muted'>Time Remaining: {timeStr}</small>;
};

export default PollCountdown;
