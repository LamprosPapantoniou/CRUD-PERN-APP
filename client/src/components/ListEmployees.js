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


import EditEmployee from "./EditEmployee";



const ListEmployees = () => {
    
    const [Employees, setEmployees] = useState([]);

    //delete Employee function 

      const deleteEmployee = async (em_id) => {
        try {
          const deleteEmployee = await fetch(`http://localhost:5000/employees/${em_id}`, {
          method: 'DELETE'
          });

          setEmployees(Employees.filter(employee => employee.em_id !== em_id))    
        } catch (err) {

          console.error(err.message)
          
        }
      }
          
    const getEmployees = async () => {
        try{
            const response = await fetch("http://localhost:5000/employees")
            const jsonData = await response.json();

            setEmployees(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        getEmployees(); //???//
    }, []);

      //format birthday date //

        const FormatBday = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-GB');
      }
  

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
              key={employee.em_id}       // ??? //
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
                {employee.first_name}
              </TableCell>
              <TableCell align="center">{employee.last_name}</TableCell>
              <TableCell align="center"> {FormatBday(employee.birth_date)}</TableCell>       
              <TableCell align="center">{employee.afm}</TableCell>
              <TableCell align="center">
              <EditEmployee employee={employee} />
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" 
               startIcon={<DeleteIcon />} 
               color="error" 
               onClick={() => deleteEmployee(employee.em_id)} >
               Διαγραφη 
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>
 </Card>
</Fragment>
    )
};

export default ListEmployees;