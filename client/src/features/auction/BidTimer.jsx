import React, { useState, useEffect } from 'react';

function BidTimer({ bidStart, bidLength }) {
  const [timeRemaining, setTimeRemaining] = useState(null);

  const parsedBidStart = Date.parse(bidStart);
  const parsedBidLength = parseInt(bidLength);
  console.log('bidStart!!!:', parsedBidStart)
  console.log('bidLength!!!:', parsedBidLength)

  useEffect(() => {
    const calculateRemainingTime = () => {
      const endTime = parsedBidStart + parsedBidLength * 60 * 60 * 1000; // Convert bidLength to milliseconds
      const remaining = endTime - new Date().getTime();

      if (remaining <= 0) {
        clearInterval(timerId);
        setTimeRemaining(null);
      } else {
        const seconds = Math.floor((remaining / 1000) % 60);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    const timerId = setInterval(calculateRemainingTime, 1000);

    // Calculate remaining time immediately after mounting
    calculateRemainingTime();

    // Clear interval on component unmount
    return () => clearInterval(timerId);
  }, [parsedBidStart, parsedBidLength]);

  if (!timeRemaining) {
    return <div>Auction ended</div>;
  }

  return (
    <div>
      <p>{`Time remaining: ${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`}</p>
    </div>
  );
}

export default BidTimer;




