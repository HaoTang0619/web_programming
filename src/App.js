import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Button,
  IconButton,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ReplayIcon from "@material-ui/icons/Replay";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import YouTube from "react-youtube";
import getYoutubeId from "get-youtube-id";
import getYoutubeTitle from "get-youtube-title";
import logo from "./logo.svg";

const useStyles = makeStyles(() => ({
  text: {
    margin: "10px",
  },
  app: {
    display: "flex",
    width: "500px",
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
    borderRadius: "40px",
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
  youtube: {
    textAlign: "center",
    display: "none",
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
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=_HLldftPI0Q");
  const [urlError, setUrlError] = useState(false);
  const [player, setPlayer] = useState(null);
  const [playInfo, setPlayInfo] = useState({
    isPlay: false,
    time: 0,
    length: 0,
    title: "欸幹 穿山甲欸 備份",
    url: "_HLldftPI0Q",
  });
  const playRef = useRef();

  const opts = {
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };

  const handleSetUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    setPlayInfo((state) => ({
      ...state,
      url: getYoutubeId(url),
    }));
  };

  const handleSetPlayer = (event) => {
    setPlayer(event.target);
    setPlayInfo((state) => ({
      ...state,
      length: Math.round(event.target.getDuration()),
    }));
    if (playRef.current !== null) {
      playRef.current.click();
    }
  };

  const handlePlayerState = (event) => {
    const st = event.target.getPlayerState();
    if (st === -1) {
      setPlayInfo((state) => ({
        ...state,
        isPlay: false,
        time: 0,
      }));
    } else if (st === 0) {
      setPlayInfo((state) => ({
        ...state,
        isPlay: false,
        time: Math.round(event.target.getDuration()),
      }));
    } else if (st === 1) {
      setPlayInfo((state) => ({
        ...state,
        isPlay: true,
        time: Math.round(player.getCurrentTime()),
      }));
    } else if (st === 2) {
      setPlayInfo((state) => ({
        ...state,
        isPlay: false,
        time: Math.round(player.getCurrentTime()),
      }));
    }
    setPlayInfo((state) => ({
      ...state,
      length: Math.round(event.target.getDuration()),
    }));
  };

  useEffect(() => {
    if (playInfo.url === null) {
      setUrlError(true);
      return;
    }
    setUrlError(false);
    getYoutubeTitle(playInfo.url, (_, title) => {
      setPlayInfo((state) => ({
        ...state,
        title,
      }));
    });
  }, [playInfo.url]);

  useEffect(() => {
    if (playInfo.isPlay) {
      const interval = setInterval(() => {
        setPlayInfo((state) => ({
          ...state,
          time: Math.round(player.getCurrentTime()),
        }));
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
  }, [player, playInfo.isPlay, playInfo.length]);

  // "_" is "event"
  const handleSetTime = (_, newPosition) => {
    if (player === null) return;
    const newTime = Math.round((newPosition * playInfo.length) / 100);
    player.seekTo(newTime);
    setPlayInfo((state) => ({
      ...state,
      time: newTime,
    }));
  };

  const addZero = (num) => {
    return `${num}`.length === 1 ? `0${num}` : `${num}`;
  };

  const timeToPosition = (t) => {
    return playInfo.length === 0 ? 0 : (t * 100) / playInfo.length;
  };

  const timeFormat = (t) => {
    return `${addZero(Math.floor(t / 60))}:${addZero(t % 60)}`;
  };

  const handlePlayPause = (type) => () => {
    if (type === true) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  };

  const handleStop = () => {
    player.seekTo(0);
    player.pauseVideo();
  };

  return (
    <>
      <div style={{ display: "flex", width: "500px", margin: "auto" }}>
        <TextField
          className={classes.text}
          error={urlError}
          helperText={urlError && "Wrong url !"}
          fullWidth
          onChange={handleSetUrl}
          label="Parse a youtube url"
          value={url}
          variant="outlined"
        />
        <Button
          onClick={handleSubmit}
          variant="outlined"
          style={{ margin: "10px" }}
        >
          Submit
        </Button>
      </div>
      <div className={classes.app}>
        <img
          src={logo}
          className={`${classes.app_logo} ${
            !playInfo.isPlay && classes.pause_animation
          }`}
          alt="logo"
        />
        <div className={classes.app_right}>
          {playInfo.title}
          <Slider
            className={classes.slider}
            onChange={handleSetTime}
            value={timeToPosition(playInfo.time)}
          />
          {playInfo.isPlay ? (
            <IconButton
              color="primary"
              component="span"
              onClick={handlePlayPause(false)}
            >
              <PauseIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              component="span"
              onClick={handlePlayPause(true)}
              ref={playRef}
            >
              {playInfo.time === playInfo.length && playInfo.length !== 0 ? (
                <ReplayIcon fontSize="large" />
              ) : (
                <PlayArrowIcon fontSize="large" />
              )}
            </IconButton>
          )}
          <IconButton color="secondary" component="span" onClick={handleStop}>
            <StopIcon fontSize="large" />
          </IconButton>
          <Typography className={classes.time} variant="button">
            {Number.isNaN(playInfo.time)
              ? "00:00 "
              : `${timeFormat(playInfo.time)} `}
            /
            {Number.isNaN(playInfo.length)
              ? " 00:00"
              : ` ${timeFormat(playInfo.length)}`}
          </Typography>
        </div>
      </div>
      <div className={classes.youtube}>
        <YouTube
          videoId={playInfo.url}
          opts={opts}
          onStateChange={handlePlayerState}
          onReady={handleSetPlayer}
        />
      </div>
    </>
  );
}
