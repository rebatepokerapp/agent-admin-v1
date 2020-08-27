import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Figures({ figuresList }) {

  let monday = 0;
  let tuesday = 0;
  let wednesday = 0;
  let thursday = 0;
  let friday = 0;
  let saturday = 0;
  let sunday = 0;
  let total = 0;  
  let granTotal = 0;

  const backToCero = () => {
    total = 0;
  }
  
  const classes = useStyles();
  return figuresList ? (
    <React.Fragment>
      <Title>Rake Figures</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right">&nbsp;</TableCell>
            <TableCell align="right">Monday</TableCell>
            <TableCell align="right">Tuesday</TableCell>
            <TableCell align="right">Wednesday</TableCell>
            <TableCell align="right">Thursday</TableCell>
            <TableCell align="right">Friday</TableCell>
            <TableCell align="right">Saturday</TableCell>
            <TableCell align="right">Sunday</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {figuresList.map((row, index) => (

            <TableRow key={index}>
              <TableCell>{row._id}</TableCell>

              {row.days.map( day => {
                total += day.total;
                granTotal += day.total;
                monday=0;
                tuesday=0;
                wednesday=0;
                thursday=0;
                friday=0;
                saturday=0;
                sunday=0;
                switch(day.day) {
                  case 2:
                    monday=day.total;
                    break;
                  case 3:
                    tuesday=day.total;
                    break;
                  case 4:
                    wednesday=day.total;
                    break;
                  case 5:
                    thursday=day.total;
                    break;
                  case 6:
                    friday=day.total;
                    break;
                  case 7:
                    saturday=day.total;
                    break;
                  case 1:
                    sunday=day.total;
                    break;
                  default:
                    break;
                }
              })}

              <TableCell align="right">{monday}</TableCell>
              <TableCell align="right">{tuesday}</TableCell>
              <TableCell align="right">{wednesday}</TableCell>
              <TableCell align="right">{thursday}</TableCell>
              <TableCell align="right">{friday}</TableCell>
              <TableCell align="right">{saturday}</TableCell>
              <TableCell align="right">{sunday}</TableCell>
              <TableCell align="right">{total}</TableCell> 
              {backToCero()}             
            </TableRow>
            
          ))}
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{granTotal}</TableCell>
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  ) : null;
}
