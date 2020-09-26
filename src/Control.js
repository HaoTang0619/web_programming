import React from "react";
import {
  makeStyles,
  withStyles,
  AppBar,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#a4d000",
    color: theme.palette.common.black,
    fontSize: 16,
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  bar: {
    background: "linear-gradient(#bbb, #888)",
  },
  root: {
    marginTop: "75px",
    textAlign: "center",
  },
  head: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  button: {
    background: "#a4d000",
    fontSize: "18px",
    width: "100px",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  table: {
    width: "100%",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.bar} position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            自動開關控制頁面
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.root} fixed maxWidth="xs">
        <div className={classes.head}>
          <Button className={classes.button}>開/關</Button>
          <Button className={classes.button}>歷史資訊</Button>
          <Button className={classes.button}>登出</Button>
        </div>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">選擇場域</InputLabel>
          <Select labelId="demo-simple-select-filled-label">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="table">
            <TableHead>
              <TableRow>
                <StyledTableCell>設備名稱</StyledTableCell>
                <StyledTableCell>設備內容</StyledTableCell>
                <StyledTableCell>設備狀態</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>1</StyledTableCell>
                <StyledTableCell>ON / OFF</StyledTableCell>
                <StyledTableCell>上線</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
