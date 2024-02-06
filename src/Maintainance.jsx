import React, { useState, useEffect } from 'react';
import './App.css';

const SiteMaintenance = () => {
  const [countdown, setCountdown] = useState({
    day: '',
    hour: '',
    minute: '',
    second: ''
  });

  useEffect(() => {
    const countDown = () => {
      const countDay = new Date('March 28, 2024 00:00:00');
      const now = new Date();
      const counter = countDay - now;
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const textDay = Math.floor(counter / day);
      const textHour = Math.floor((counter % day) / hour);
      const textMinute = Math.floor((counter % hour) / minute);
      const textSecond = Math.floor((counter % minute) / second);
      setCountdown({
        day: textDay + ' Days',
        hour: textHour + ' Hours',
        minute: textMinute + ' Minutes',
        second: textSecond + ' Seconds'
      });
    };
    const interval = setInterval(countDown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background">
      <h1>We&rsquo;ll be back soon!</h1>
      <article>
        <div>
          <p>
            Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always{' '}
            <a href="mailto:meetbeddy@gmail.com">contact us</a>, otherwise we&rsquo;ll be back online shortly!
          </p>
          <p>&mdash; The Team</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <p className="day">{countdown.day}</p>
          <p className="hour">{countdown.hour}</p>
          <p className="minute">{countdown.minute}</p>
          <p className="second">{countdown.second}</p>
        </div>
      </article>
    </div>
  );
};

export default SiteMaintenance;
