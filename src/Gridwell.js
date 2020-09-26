import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Home from "./Home";

const useStyles = makeStyles(() => ({
  button: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
  },
}));

export default function Gridwell() {
  const classes = useStyles();
  const [tab, setTab] = useState(true);

  const tabSwitch = () => {
    setTab((t) => !t);
  };

  return (
    <>
      {tab && <Home />}
      <Button
        className={classes.button}
        onClick={tabSwitch}
        variant="contained"
      >
        切換
      </Button>
    </>
  );
}
