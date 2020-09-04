import React, { useState, useEffect } from 'react'
import {getFiguresByAgent} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  total: {
    fontWeight: '700',
  },
}));

const FiguresReport = ({byagentid}) => {

  const classes = useStyles();

  let monday = 0;
  let tuesday = 0;
  let wednesday = 0;
  let thursday = 0;
  let friday = 0;
  let saturday = 0;
  let sunday = 0;
  let total = 0;  
  let granTotal = 0;
  let actualIndex = -1;

  const backToCero = () => {
    total = 0;
  }
  var sub = null;
  var byId = false;

  if(byagentid){
    sub = byagentid;
    byId = true;
  }
  
  const [weeknumber, setWeek] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getFiguresByAgent(weeknumber,byId,sub))
    }
    fetchData();
  }, [dispatch])

  const handleChangePage = (event, newPage) => {
    var page = 0;
    if(newPage === 2){
      if(weeknumber < 10){
        page = weeknumber + 1;
      }else{
        page = 10
      }
    }else{
      if(weeknumber === 0){
        page = 0;
      }else{
        page = weeknumber - 1;
      }
    }
    dispatch(getFiguresByAgent(page,byId,sub))
    setWeek(page);
  };

  const figuresList = useSelector(store => store.agent.figures);

  return figuresList ? (
    <React.Fragment>
      <Title>Rake Figures</Title>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">&nbsp;</TableCell>
              <TableCell align="right" className={classes.total}>Monday</TableCell>
              <TableCell align="right" className={classes.total}>Tuesday</TableCell>
              <TableCell align="right" className={classes.total}>Wednesday</TableCell>
              <TableCell align="right" className={classes.total}>Thursday</TableCell>
              <TableCell align="right" className={classes.total}>Friday</TableCell>
              <TableCell align="right" className={classes.total}>Saturday</TableCell>
              <TableCell align="right" className={classes.total}>Sunday</TableCell>
              <TableCell align="right" className={classes.total}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {figuresList.map((row, index) => (

              <TableRow key={index}>
                <TableCell>{row._id}</TableCell>

                {row.days.forEach( day => {
                  total += day.total;
                  granTotal += day.total;
                  if(actualIndex !== index){
                    monday=0;
                    tuesday=0;
                    wednesday=0;
                    thursday=0;
                    friday=0;
                    saturday=0;
                    sunday=0;
                    actualIndex=index;
                  }                
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
              <TableRow>
                <TableCell align="left" className={classes.total}>Total</TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}></TableCell>
                <TableCell align="right" className={classes.total}>{granTotal}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={0}
          rowsPerPage={0}
          page={1}
          onChangePage={handleChangePage}
          backIconButtonText = 'Last Week'
          nextIconButtonText = 'Next Week'
      />
      <div className={classes.seeMore}></div>
    </React.Fragment>
  ) : null;
}

export default FiguresReport
