import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //styles
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  //error on login
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = inputs;
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
      } else {
        setErrorMessage("Λάθος email ή κωδικός!");
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Dialog open>
        <Grid align="center" marginTop="6px">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid align="center">
          <DialogTitle>Sign In</DialogTitle>
        </Grid>

        <DialogContent>
          <DialogContentText>Συνδεθείτε για να συνεχίσετε :</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="email"
            type="email"
            fullWidth
            variant="standard"
            value={inputs.email}
            onChange={(e) =>
              setInputs({
                ...inputs,
                email: e.target.value,
              })
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
            variant="standard"
            value={inputs.password}
            onChange={(e) =>
              setInputs({
                ...inputs,
                password: e.target.value,
              })
            }
            required
          />
          {errorMessage && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong> {errorMessage} </strong>
            </Alert>
          )}
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              onClick={onSubmit}
            >
              Συνδεση
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Login;
