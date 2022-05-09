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
import { useNavigate } from "react-router-dom";

import { DatePicker } from "@mui/lab";

const InputEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: null,
    lastName: null,
    birthDate: null,
    afm: null,
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      //pass 2 headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const response = await fetch(`/employees?afm=${newEmployee.afm}`, {
        headers: myHeaders,
      });
      const returnAfm = await response.json();

      if (newEmployee.afm === null) {
        setErrorMessage("To πεδίο ΑΦΜ δεν μπορει να ειναι κενό!");
      } else if (newEmployee.afm.length < 9 || newEmployee.afm.length > 9) {
        setErrorMessage("To πεδίο ΑΦΜ πρέπει να περιέχει 9 ψηφία!");

        // eslint-disable-next-line eqeqeq
      } else if (returnAfm.afm != newEmployee.afm) {
        const body = newEmployee;
        await fetch("/employees", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        });
        navigate("/");
      } else {
        setErrorMessage("To ΑΦΜ υπάρχει ήδη!");
      }
    } catch (err) {
      setErrorMessage("Ουπς...Κάτι πηγε στραβά!");
    }
  };

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <Fragment>
      <Dialog open>
        <DialogTitle>ΕΓΓΡΑΦΗ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Εισάγετε τα στοιχεία του υπαλλήλου.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ΟΝΟΜΑ"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.firstName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            id="lastName"
            label="ΕΠΩΝΥΜΟ"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.lastName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                lastName: e.target.value,
              })
            }
          />

          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
            value={new Date(newEmployee.birthDate)}
            onChange={(date) => {
              setNewEmployee({
                ...newEmployee,
                birthDate: FormatBday(date),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            margin="dense"
            id="afm"
            label="ΑΦΜ"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.afm}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                afm: e.target.value,
              })
            }
          />
        </DialogContent>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong> {errorMessage} </strong>
          </Alert>
        )}
        <DialogActions>
          <Button onClick={() => navigate("/")}>ΕΞΟΔΟΣ</Button>
          <Button onClick={onSubmitForm}>ΕΓΓΡΑΦΗ</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default InputEmployee;
