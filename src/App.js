import React, { useState, useEffect } from "react";
import { makeStyles, IconButton, Slider, Typography } from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import logo from "./logo.svg";

const useStyles = makeStyles(() => ({
  app: {
    display: "flex",
    maxWidth: "500px",
    margin: "20px auto",
    border: "5px solid #0090ff",
    borderRadius: "15px",
    textAlign: "center",
  },
  app_logo: {
    height: "80px",
    width: "80px",
    margin: "10px",
    border: "1.5px solid #0090ff",
    borderRadius: "45px",
    animation: `$app_logo_spin infinite 5s linear`,
  },
  pause_animation: {
    animationPlayState: "paused",
  },
  app_right: {
    width: "100%",
    paddingRight: "10%",
  },
  slider: {
    margin: "10px 20px",
  },
  time: {
    margin: "0 10px",
  },
  "@keyframes app_logo_spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

export default function App() {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  // "_" is "event"
  const handlesetTime = (_, newPosition) => {
    const newTime = Math.round((newPosition * 180) / 100);
    setTime(newTime);
  };

  const addZero = (num) => {
    return `${num}`.length === 1 ? `0${num}` : `${num}`;
  };

  const timeToPosition = (t) => {
    return (t * 100) / 180;
  };

  const timeFormat = (t) => {
    return `${addZero(Math.floor(t / 60))}:${addZero(t % 60)}`;
  };

  const handleSetIsPlay = () => {
    if (time === 180) return;
    setIsPlay((p) => !p);
  };

  const handleStop = () => {
    setIsPlay(false);
    setTime(0);
  };

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        setTime((t) => {
          if (t < 180) {
            if (t === 179) setIsPlay(false);
            return t + 1;
          }
          return t;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isPlay]);

  return (
    <>
      <div className={classes.app}>
        <img
          src={logo}
          className={`${classes.app_logo} ${
            !isPlay && classes.pause_animation
          }`}
          alt="logo"
        />
        <div className={classes.app_right}>
          <Slider
            className={classes.slider}
            onChange={handlesetTime}
            value={timeToPosition(time)}
          />
          {isPlay ? (
            <IconButton
              color="primary"
              component="span"
              onClick={handleSetIsPlay}
            >
              <PauseIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              component="span"
              onClick={handleSetIsPlay}
            >
              <PlayArrowIcon fontSize="large" />
            </IconButton>
          )}
          <IconButton color="secondary" component="span" onClick={handleStop}>
            <StopIcon fontSize="large" />
          </IconButton>
          <Typography className={classes.time} variant="button">
            {timeFormat(time)} / 03:00
          </Typography>
        </div>
      </div>
    </>
  );
}
