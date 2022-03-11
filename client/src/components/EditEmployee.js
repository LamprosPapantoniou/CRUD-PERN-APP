import React, { Fragment, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@material-ui/core/Textfield';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';

const EditEmployee = ({ employee }) => {
    const [first_name, setfirst_name] = useState(employee.first_name);
    const [last_name, setlast_name] = useState(employee.last_name);
    const [birth_date, setbirth_date] = useState(employee.birth_date);
    const [afm, setafm] = useState(employee.afm);
    const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setfirst_name(employee.first_name);
    setlast_name(employee.last_name);
    setbirth_date(employee.birth_date);
    setafm(employee.afm)

  };

  //edit employee function

  const updateEmployee = async e => {
    e.preventDefault();
    try {
      const body = { first_name, last_name, birth_date, afm };
      const response = await fetch(
        `http://localhost:5000/employees/${employee.em_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Fragment>
    <Button variant="contained" color='warning' startIcon={<UpdateIcon />} onClick={handleClickOpen}>
        ΕΝΗΜΕΡΩΣΗ
    </Button>
    <Dialog open={open} onClose={handleClose}  >
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
        value={first_name}
        onChange= { e => setfirst_name(e.target.value) }
      />
       <TextField
        autoFocus
        margin="dense"
        id="name"
        label="ΕΠΩΝΥΜΟ"
        type="text"
        fullWidth
        variant="standard"
        value={last_name}
        onChange= { e => setlast_name(e.target.value) }
      />
       <TextField
        autoFocus
        margin="dense"
        id="name"
        label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
        type="date"
        fullWidth
        variant="standard"
        value={birth_date}
        InputLabelProps={{
          shrink: true,
        }}
        onChange= { e => setbirth_date(e.target.value) }
      />
       <TextField
        autoFocus
        margin="dense"
        id="name"
        label="ΑΦΜ"
        type="text"
        fullWidth
        variant="standard"
        value={afm}
        onChange= { e => setafm(e.target.value) }
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>ΕΞΟΔΟΣ</Button>
      <Button onClick={e => updateEmployee(e)}>ΕΝΗΜΕΡΩΣΗ</Button>
    </DialogActions>
  </Dialog>
</Fragment>

)};

export default EditEmployee;