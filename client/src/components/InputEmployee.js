import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/Textfield';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from "react-router-dom";



const InputEmployee = () => {

  const[newEmployee, setNewEmployee]= useState ({
    firstName: null,
    lastName: null,
    birthDate: null,
    afm: null
  })

  const [errorMessage, setErrorMessage] = useState(false); 

 const navigate = useNavigate();

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = newEmployee; 
        await fetch('http://localhost:5000/employees', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      navigate("/");  

    } catch (err) {
      setErrorMessage('Ουπς...Κάτι πηγε στραβά!');
    }
  };


  return(
    <Fragment>

      <Dialog open  >
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
            onChange= { e => setNewEmployee({
              ...newEmployee,
              firstName : e.target.value
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
            value={newEmployee.lastName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange= { e => setNewEmployee({
              ...newEmployee,
              lastName : e.target.value
            })
          }
          />

          <TextField  
            margin="dense"
            id="name"
            label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
            type="date"
            fullWidth
            variant="standard"
            value={newEmployee.birthDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange= { e => setNewEmployee({
              ...newEmployee,
              birthDate : e.target.value
            })
          }
          />

           <TextField
            margin="dense"
            id="name"
            label="ΑΦΜ"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.afm}
            InputLabelProps={{
              shrink: true,
            }}
            onChange= { e => setNewEmployee({
              ...newEmployee,
              afm : e.target.value
            })
          }
          />
        </DialogContent>
        { errorMessage && 
           <Alert severity="error" >
           <AlertTitle>Error</AlertTitle> 
            <strong> {errorMessage} </strong> 
           </Alert> 
        }
        <DialogActions>
          <Button onClick={() => navigate("/")}>ΕΞΟΔΟΣ</Button>
          <Button onClick={onSubmitForm}>ΕΓΓΡΑΦΗ</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
 
)};

export default InputEmployee;