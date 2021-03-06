import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, CardContent, Typography } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import Grid from "@mui/material/Grid";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../index.css"; // Import css

const ListEmployees = ({ setAuth }) => {
  const [Employees, setEmployees] = useState([]);
  const [countPages, setCountPages] = useState();
  const [page, setPage] = useState(1);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disablePrevButton, setDisablePrevButton] = useState(false);

  const HandleNextPage = () => {
    if (page < countPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const HandlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const HandleNextButton = () => {
    if (page >= countPages) {
      setDisableNextButton(true);
    } else setDisableNextButton(false);
  };

  const HandlePrevButton = () => {
    if (page === 1) {
      setDisablePrevButton(true);
    } else setDisablePrevButton(false);
  };

  //get all employees//
  const getEmployees = async () => {
    try {
      const response = await fetch(`/employees?page=${page}`);
      const getEmployees = await response.json();

      setEmployees(getEmployees.employees);
      setCountPages(getEmployees.countPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete Employee function
  const deleteEmployee = async (id) => {
    try {
      await fetch(`/employees/${id}`, {
        method: "DELETE",
      });

      getEmployees();
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete confirmation popup//
  const deleteConf = (id) => {
    confirmAlert({
      title: "?????????????????????? ??????????????????",
      message: "?????????? ????????????????/??, ?????? ???????????? ???? ???????????????????? ?????? ????????????;",
      buttons: [
        {
          cursor: "pointer",
          label: "N????",
          onClick: () => deleteEmployee(id),
        },
        {
          cursor: "pointer",
          label: "??????",
          onClick: () => navigate("/"),
        },
      ],
    });
  };

  //navigate //
  const navigate = useNavigate();

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  //logout button style
  const btnstyle = { margin: "8px 0" };

  //logout button function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getEmployees();
    HandleNextButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    HandlePrevButton();
    HandleNextButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Employees]);

  return (
    <Fragment>
      <Card
        style={{
          marginBottom: ".7rem",
          backgroundColor: "#1e272e",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "white",
            }}
          ></div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>??????????</TableCell>
                  <TableCell align="center">??????????????</TableCell>
                  <TableCell align="center">???????????????????? ????????????????</TableCell>
                  <TableCell align="center">??.??.??</TableCell>
                  <TableCell align="center">?????????????????? ?????????????????? </TableCell>
                  <TableCell align="center">???????????????? ?????????????????? </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Employees.map((employee) => (
                  <TableRow
                    key={employee.id} // ??? //
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {employee.firstname}
                    </TableCell>
                    <TableCell align="center">{employee.lastname}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {FormatBday(employee.birthdate)}
                    </TableCell>
                    <TableCell align="center">{employee.afm}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<UpdateIcon />}
                        onClick={() =>
                          navigate(`/employees/${employee.id}/edit`)
                        }
                      >
                        ??????????????????
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => deleteConf(employee.id)}
                      >
                        ????????????????
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography align="right" margin="0.5rem">
              <span> ???????????? {page}??</span>
              <Button
                className="btn default"
                variant="raised"
                disabled={disablePrevButton}
                onClick={() => HandlePrevPage()}
                startIcon={<NavigateBeforeIcon />}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderColor: "#e7e7e7",
                  borderRadius: "65px",
                  marginLeft: "20px",
                  marginRight: "10px",
                }}
              ></Button>

              <Button
                className="btn default"
                variant="raised "
                disabled={disableNextButton}
                onClick={() => HandleNextPage()}
                startIcon={<NavigateNextIcon />}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderColor: "#e7e7e7",
                  borderRadius: "65px",
                }}
              ></Button>
            </Typography>
          </TableContainer>
        </CardContent>
      </Card>
      <Grid align="center">
        <Button
          type="submit"
          color="error"
          variant="contained"
          style={btnstyle}
          onClick={logout}
        >
          ????????????????????
        </Button>
      </Grid>
    </Fragment>
  );
};

export default ListEmployees;
