import React, { Fragment, useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@material-ui/core/Textfield';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate, useParams } from "react-router-dom";


const EditEmployee = () => {

     const [updateEmployee, setUpdateEmployee] = useState({
      firstName: null,
      lastName: null,
      birthDate: null,
      afm: null
    })
  

    const [errorMessage, setErrorMessage] = useState(false);


    const navigate = useNavigate();
    const params = useParams();

    
    useEffect(() => {
      if (params.id) {
        loadEmployee(params.id);
      }
    }, [params.id]);


    const loadEmployee = async (id) => {
      const res = await fetch("http://localhost:5000/employees/" + id);
      const employee = await res.json();

      setUpdateEmployee({ firstName: employee.firstname, lastName: employee.lastname,  birthDate: employee.birthdate, afm: employee.afm } );
 
    };
  
  
    //edit employee function
   
    const onSubmitForm = async e => {
    e.preventDefault();
    try { 
        await fetch(
        "http://localhost:5000/employees/" + params.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateEmployee)
        }
      );

      navigate("/");

     } catch (err) {
      setErrorMessage('Ουπς...Κάτι πηγε στραβά!');
    }
  };

  return(
    <Fragment>
     <Dialog open >
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
        onChange= { e => setUpdateEmployee({
          ...updateEmployee,
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
        value={updateEmployee.lastName}
        InputLabelProps={{
          shrink: true,
        }}
        onChange= { e => setUpdateEmployee({
          ...updateEmployee,
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
        value={updateEmployee.birthDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange= { e => setUpdateEmployee({
          ...updateEmployee,
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
        value={updateEmployee.afm}
        InputLabelProps={{
          shrink: true,
        }}
        onChange= { e => setUpdateEmployee({
          ...updateEmployee,
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
      <Button onClick={e => onSubmitForm(e)}>ΕΝΗΜΕΡΩΣΗ</Button>
    </DialogActions>
  </Dialog>
</Fragment>

)
};

export default EditEmployee;