import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {useDispatch, useSelector} from 'react-redux';
import {getFiguresByAgent} from '../redux/AgentDucks';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Figures(props) {

  let monday = 0;
  let tuesday = 0;
  let wednesday = 0;
  let thursday = 0;
  let friday = 0;
  let saturday = 0;
  let sunday = 0;

  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = () => {
      dispatch(getFiguresByAgent())
    }
    fetchData();
  }, [dispatch])

  const figuresList = useSelector(store => store.agent.figures).data;
  
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
          </TableRow>
        </TableHead>
        <TableBody>
          {figuresList.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row._id}</TableCell>

              {row.days.map( day => {
                monday=0;
                tuesday=0;
                wednesday=0;
                thursday=0;
                friday=0;
                saturday=0;
                sunday=0;
                switch(day.day) {
                  case 1:
                    monday=day.total;
                    break;
                  case 2:
                    tuesday=day.total;
                    break;
                  case 3:
                    wednesday=day.total;
                    break;
                  case 4:
                    thursday=day.total;
                    break;
                  case 5:
                    friday=day.total;
                    break;
                  case 6:
                    saturday=day.total;
                    break;
                  case 7:
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  ) : null;
}
