import React, { Fragment, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate, useParams } from "react-router-dom";

import { DatePicker } from "@mui/lab";

const EditEmployee = () => {
  const [updateEmployee, setUpdateEmployee] = useState({
    firstName: null,
    lastName: null,
    birthDate: null,
    afm: null,
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  //Load Employee//
  const loadEmployee = async (id) => {
    const res = await fetch(`/employees/${id}`);
    const employee = await res.json();

    setUpdateEmployee({
      firstName: employee.firstname,
      lastName: employee.lastname,
      birthDate: FormatBday(employee.birthdate),
      afm: employee.afm,
    });
  };

  //useEffect
  useEffect(() => {
    if (params.id) {
      loadEmployee(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  //edit employee function

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/employees?afm=${updateEmployee.afm}`);
      const returnEmployee = await response.json();

      if (updateEmployee.afm.length === 0) {
        setErrorMessage("To πεδίο ΑΦΜ δεν μπορει να ειναι κενό!");
      } else if (
        updateEmployee.afm.length < 9 ||
        updateEmployee.afm.length > 9
      ) {
        setErrorMessage("To πεδίο ΑΦΜ πρέπει να περιέχει 9 ψηφία!");

        // eslint-disable-next-line eqeqeq
      } else if (
        returnEmployee.afm !== updateEmployee.afm ||
        // eslint-disable-next-line eqeqeq
        returnEmployee.id == params.id
      ) {
        await fetch(`/employees/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateEmployee),
        });
        navigate("/");
      } else {
        setErrorMessage("To ΑΦΜ υπάρχει ήδη!");
      }
    } catch (err) {
      setErrorMessage("Ουπς...Κάτι πηγε στραβά!");
    }
  }

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
            Επεξεργαστείτε τα στοιχεία του υπαλλήλου.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ΟΝΟΜΑ"
            type="text"
            fullWidth
            variant="standard"
            value={updateEmployee.firstName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setUpdateEmployee({
                ...updateEmployee,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            id="name"
            label="ΕΠΩΝΥΜΟ"
            type="text"
            fullWidth
            variant="standard"
            value={updateEmployee.lastName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setUpdateEmployee({
                ...updateEmployee,
                lastName: e.target.value,
              })
            }
          />

          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
            value={new Date(updateEmployee.birthDate)}
            onChange={(date) => {
              setUpdateEmployee({
                ...updateEmployee,
                birthDate: FormatBday(date),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            margin="dense"
            id="name"
            label="ΑΦΜ"
            type="text"
            fullWidth
            variant="standard"
            value={updateEmployee.afm}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setUpdateEmployee({
                ...updateEmployee,
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
          <Button onClick={(e) => onSubmitForm(e)}>ΕΝΗΜΕΡΩΣΗ</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditEmployee;
