import React, {Fragment, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, CardContent, Typography } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const ListEmployees = () => {
  //reach end error //
   const [errorMessage, setErrorMessage] = useState(false);

    
    const [Employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1)

    
    const HandleNextPage = () => {
      if (Employees.length !== 0) {
      setPage(prevPage => prevPage + 1)
      }
    }

    const HandlePrevPage = () => {
      if (page > 1 )  {
      setPage(prevPage => prevPage - 1)
      }
    }

    const HandleEndPage = () => {
      if (Employees.length === 0)  {
      setErrorMessage('Δεν υπάρχουν άλλοι εργαζόμενοι') 
      }else
       {setErrorMessage(false)
       }
    }
    

    console.log(page);
    //get all employees//

    const getEmployees = async () => {
      try{
          const response = await fetch(`http://localhost:5000/employees/?page=${page}`)
          const getEmployees = await response.json();
                      
          setEmployees(getEmployees);
          console.log(getEmployees);
      } catch(err) {
          console.error(err.message);
      }
    };

    //delete Employee function 
      const deleteEmployee = async (id) => {
        try {
           await fetch(`http://localhost:5000/employees/${id}`, {
           method: 'DELETE'
          });

          getEmployees();

        } catch (err) {
          console.error(err.message)  
        }
      }

      //delete confirmation popup//
      const deleteConf = (id) => {

        confirmAlert({
          title: 'Επιβεβαιωση διαγραφής',
          message: 'Είστε σίγουρος/η, οτι θέλετε να διαγράψετε τον χρήστη;',
          buttons: [
            {
              cursor: 'pointer',
              label: 'Nαι',
              onClick:() => deleteEmployee(id)
            },
            {
              cursor: 'pointer',
              label : 'Οχι',
              onClick: () => navigate ('/')
            }
          ]
        });
  
      } 
          
    
      //navigate //

      const navigate = useNavigate();

      //format birthday date //

        const FormatBday = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-GB');
      }
  
      useEffect(() => {
        getEmployees(); 
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [page]);

     useEffect(() => {
      HandleEndPage(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Employees]);

    return(
      <Fragment>
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e"
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
            <TableCell>ΟΝΟΜΑ</TableCell>
            <TableCell align="center">ΕΠΩΝΥΜΟ</TableCell>
            <TableCell align="center">ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ</TableCell>
            <TableCell align="center">Α.Φ.Μ</TableCell>
            <TableCell align="center">ΕΝΗΜΕΡΩΣΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
            <TableCell align="center">ΔΙΑΓΡΑΦΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Employees.map((employee) => (

            <TableRow
              key={employee.id}       // ??? //
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee.firstname}
              </TableCell>
              <TableCell align="center">{employee.lastname}</TableCell>
              <TableCell align="center"> {FormatBday(employee.birthdate)}</TableCell>       
              <TableCell align="center">{employee.afm}</TableCell>
              <TableCell align="center">
              <Button 
               variant="contained"
               color='warning' 
               startIcon={<UpdateIcon />} 
               onClick={() => navigate(`/employees/${employee.id}/edit`)}>
               Ένημέρωση 
              </Button>
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" 
               startIcon={<DeleteIcon />} 
               color="error" 
               onClick={() => deleteConf(employee.id)} >
               Διαγραφη 
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> 
      </Table>
      { errorMessage && 
           <Alert severity='info' >
           <AlertTitle> <strong>Φτάσατε στο τέλος της λίστας:</strong></AlertTitle> 
             {errorMessage} <DoNotTouchIcon /> 
           </Alert> 
      }
      <Typography align='right'  margin='0.5rem'>

            <span>Σελίδα {page}η</span>
            <Button variant='contained'
            onClick={() => HandlePrevPage()} 
            startIcon={<NavigateBeforeIcon />}
            style={{backgroundColor :'#002147', 
            color :'#ffffff',
            boxShadow : 'none',
            borderRadius: '50px',
            padding: '8px',
            margin: '7px',
            marginLeft: '20px',
            fontFamily: 'Arial',
            fontSize: '16px',
           }}
            >
            </Button>

            <Button variant="contained"
            onClick={() => HandleNextPage()} 
            startIcon={<NavigateNextIcon />}
            style={{backgroundColor :'#002147',
            color :'#ffffff',
            boxShadow : 'none',
            borderRadius: '50px',
            padding: '8px',
            margin: '7px',
            fontFamily: 'Arial',
            fontSize: '16px'
          }}
            >
            </Button>
      </Typography>
    </TableContainer>
  </CardContent>
 </Card>
</Fragment>
)};

export default ListEmployees;