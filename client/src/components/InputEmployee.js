import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/Textfield';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {AppBar,Box, Container} from '@mui/material';
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";


const InputEmployee = () => {

  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [birth_date, setbirth_date] = useState('');
  const [afm, setafm] = useState('');
  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
       const body= { first_name, last_name, birth_date, afm }; 
       const response = await fetch('http://localhost:5000/employees', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      window.location = '/';

    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: '#808080'}} >
                 ΛΙΣΤΑ ΥΠΑΛΛΗΛΩΝ  
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<PersonAddAltIcon />}
                onClick={handleClickOpen}
              >
               ΠΡΟΣΘΗΚΗ ΥΠΑΛΛΗΛΟΥ 
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    
  

      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={onSubmitForm}>ΕΓΓΡΑΦΗ</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
 
)};

export default InputEmployee;