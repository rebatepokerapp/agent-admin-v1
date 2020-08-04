import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(player, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
  return { player, monday, tuesday, wednesday, thursday, friday, saturday, sunday };
}

const rows = [
  createData('Canazo', 0, 0, 0, 0, 0, 0, 0),
  createData('Chris', 0, 0, 0, 0, 0, 0, 0),
  createData('Jona', 0, 0, 0, 0, 0, 0, 0),
  createData('Leo', 0, 0, 0, 0, 0, 0, 0),
  createData('Scott', 0, 0, 0, 0, 0, 0, 0),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Rake Figures</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>Tuesday</TableCell>
            <TableCell>Wednesday</TableCell>
            <TableCell>Thursday</TableCell>
            <TableCell>Friday</TableCell>
            <TableCell>Saturday</TableCell>
            <TableCell>Sunday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.player}</TableCell>
              <TableCell align="right">{row.monday}</TableCell>
              <TableCell align="right">{row.tuesday}</TableCell>
              <TableCell align="right">{row.wednesday}</TableCell>
              <TableCell align="right">{row.thursday}</TableCell>
              <TableCell align="right">{row.friday}</TableCell>
              <TableCell align="right">{row.saturday}</TableCell>
              <TableCell align="right">{row.sunday}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  );
}