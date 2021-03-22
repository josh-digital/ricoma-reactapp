import React, { useState, useEffect, useRef } from "react";
import closeMenu from "../../Assets/White-Close.svg";
import "./style.css";

export default function Timer(props) {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const timeNotation = { d: "days", h: "hour", m: "minutes", s: "seconds" };
  const countDown = useRef();

  useEffect(() => {
    const time = new Date(new Date().getTime() + 1000 * 60 * 60 * 24).getTime();
    countDown.current = setInterval(() => {
      const currentDate = new Date().getTime();
      let diffr = time - currentDate;
      let day = Math.floor(diffr / (24 * 60 * 60 * 1000));
      let hour = Math.floor((diffr % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      let min = Math.floor((diffr % (60 * 60 * 1000)) / (60 * 1000));
      let sec = Math.floor((diffr % (60 * 1000)) / 1000);
      let obj = {
        d: day < 10 ? "0" + day : day,
        h: hour < 10 ? "0" + hour : hour,
        m: min < 10 ? "0" + min : min,
        s: sec < 10 ? "0" + sec : sec,
      };
      setTime(obj);
      if (diffr < 0) {
        clearInterval(countDown.current);
        let obj = {
          d: "00",
          h: "00",
          m: "00",
          s: "00",
        };
        setTime(obj);
      }
    }, 1000);
    return () => clearInterval(countDown.current);
  }, []);

  return (
    <div className="timer-main-content">
      <div className="timer-container">
        <div className="timer-days timer-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </div>
        <div className="timer-outer-container">
          {Object.keys(time).map((data, i) => (
            <div className="time-notation" key={i}>
              <div className="timer-time"> {time[data]} </div>
              <div className="timer-days"> {timeNotation[data]} </div>
            </div>
          ))}
        </div>
        <div className="close-icon" onClick={props.handleHideTimer}>
          <img alt="clone menu" src={closeMenu} />
        </div>
      </div>
    </div>
  );
}
