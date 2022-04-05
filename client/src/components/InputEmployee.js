import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate} from "react-router-dom";


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
      const response = await fetch(`/employees?afm=${newEmployee.afm}`) //returns the users  with the same afm as the inserted one (if exists)
      const returnAfm = await response.json();
      
      
      // eslint-disable-next-line eqeqeq
      if (returnAfm.afm != newEmployee.afm) {
        const body = newEmployee; 
        await fetch('/employees', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      navigate("/");  

      }else if (newEmployee.afm === null) {
        setErrorMessage('To πεδίο ΑΦΜ δεν μπορει να ειναι κενό!');
      }else {
        setErrorMessage('To ΑΦΜ υπάρχει ήδη!');
      }

     }catch (err) {
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
            id="lastName"
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
            id="dateOfBirth"
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
            id="afm"
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
