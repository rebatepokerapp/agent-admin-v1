import React, { useState, useEffect } from 'react'
import {getFiguresByAgent} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  total: {
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#2e2e2e',
    color: '#FFA900',
    fontSize: 'large'
  },
  celtotal: {
    backgroundColor: '#2e2e2e',
    color: '#FFA900',
    fontSize: 'large'
  },
  button: {
    backgroundColor: '#2e2e2e',
    color: '#FFA900',
    margin: '5px'
  },
  title: {
    margin: '5px',
    marginLeft: '10px',
    color: 'green',
    marginTop: '10px',
    fontSize: '24px',
  }
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

  let mondaydesc = '';
  let tuesdaydesc = '';
  let wednesdaydesc = '';
  let thursdaydesc = '';
  let fridaydesc = '';
  let saturdaydesc = '';
  let sundaydesc = '';

  let total = 0;  
  let granTotal = 0;
  let actualIndex = -1;
  let actualAgent = '';
  var indx = 100000;

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
    dispatch(getFiguresByAgent(weeknumber,byId,sub));
  }, [weeknumber, byId, sub, dispatch])

  const handleChangePage = (option) => {
    var page = 0;
    if(option === -1){
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

  const agentHeader = (agentName, i) => {
    if(agentName.toString().trim() !== actualAgent.toString().trim()){
      actualAgent = agentName;
      let ind = indx+1;
      return(
        <>
          <TableRow key={ind}>
            <TableCell align="center" className={classes.header} colSpan={10}>{agentName.toString().toUpperCase()}</TableCell>
          </TableRow>
        </>
      )
    }
  }

  moment.updateLocale('en', {
    week: {
      dow : 1, // Monday is the first day of the week.
    }
  })

  const month_name = function(dt){
    var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return mlist[dt.getMonth()];
  };

  let month = month_name(moment().subtract(weeknumber, 'weeks').startOf('week').toDate()).toUpperCase();
  

  const figuresList = useSelector(store => store.agent.figures);

  let numday = 0;

  for (let index = 0; index < 7; index++) {
    numday=moment().subtract(weeknumber, 'weeks').startOf('week').add(index,'days').toDate().getUTCDate();
    switch(index) {
      case 0:
        mondaydesc=`Monday ${numday}`;
        break;
      case 1:
        tuesdaydesc=`Tuesday ${numday}`;
        break;
      case 2:
        wednesdaydesc=`Wednesday ${numday}`;
        break;
      case 3:
        thursdaydesc=`Thursday ${numday}`;
        break;
      case 4:
        fridaydesc=`Friday ${numday}`;
        break;
      case 5:
        saturdaydesc=`Saturday ${numday}`;
        break;
      case 6:
        sundaydesc=`Sunday ${numday}`;
        break;
      default:
        break;
    }   
  }

  return figuresList ? (
    <React.Fragment>
      <div className={classes.title}>{`RAKE FIGURES ${month}`}</div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow key='200000'>
              <TableCell align="right">&nbsp;</TableCell>
              <TableCell align="right" className={classes.total}>Agent</TableCell>
              <TableCell align="right" className={classes.total}>{mondaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>{tuesdaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>{wednesdaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>{thursdaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>{fridaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>{saturdaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>{sundaydesc}</TableCell>
              <TableCell align="right" className={classes.total}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {figuresList.map((row, index) => (  
              <>
              {agentHeader(row._id.agent, index)}                                  
              <TableRow key={index}>                                
                <TableCell>{row._id.username}</TableCell>
                <TableCell>{row._id.agent}</TableCell>

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
                }                
                )}

                <TableCell align="right">{monday.toFixed(2)}</TableCell>
                <TableCell align="right">{tuesday.toFixed(2)}</TableCell>
                <TableCell align="right">{wednesday.toFixed(2)}</TableCell>
                <TableCell align="right">{thursday.toFixed(2)}</TableCell>
                <TableCell align="right">{friday.toFixed(2)}</TableCell>
                <TableCell align="right">{saturday.toFixed(2)}</TableCell>
                <TableCell align="right">{sunday.toFixed(2)}</TableCell>
                <TableCell align="right">{total.toFixed(2)}</TableCell> 
                {backToCero()}                             
              </TableRow>
              </>
              
            ))}
              <TableRow key='200001'>
                <TableCell align="left" className={classes.celtotal}>Total</TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}></TableCell>
                <TableCell align="right" className={classes.celtotal}>{granTotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow key='200002'>
                <TableCell colSpan={10} align='right'>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<NavigateBeforeIcon style={{ color: '#FFA900' }}/>}
                  onClick={() => {
                    handleChangePage(-1)
                  }}
                >
                  Last
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<NavigateNextIcon style={{ color: '#FFA900' }}/>}
                  onClick={() => {
                    handleChangePage(1)
                  }}
                >
                  Next
                </Button>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>      
    </React.Fragment>
  ) : null;
}

export default FiguresReport
