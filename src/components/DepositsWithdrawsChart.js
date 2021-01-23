import React, {useEffect,useState} from 'react'
import {getDepositsWithdrawsByAgent} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  total: {
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#CCCCCC',
    color: 'black',
    fontSize: 'large'
  },
  celtotal: {
    backgroundColor: '#CCCCCC',
    color: 'black',
    fontSize: 'large'
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#669933',
    fontWeight: '700',
    minWidth: '155px',
    margin: '5px',
    '&:hover': {
      background: "green"
    },
  },  
  title: {
    margin: '5px',
    marginLeft: '10px',
    color: 'green',
    marginTop: '10px',
    fontSize: '24px',
  }
}));

const DepositsWithdrawsChart = ({byagentid}) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [weeknumber, setWeek] = useState(0);

  moment.updateLocale('en', {
    week: {
      dow : 1, // Monday is the first day of the week.
    }
  });

  let mondaydesc = '';
  let tuesdaydesc = '';
  let wednesdaydesc = '';
  let thursdaydesc = '';
  let fridaydesc = '';
  let saturdaydesc = '';
  let sundaydesc = '';

  var sub = null;
  var byId = false;

  if(byagentid){
    sub = byagentid;
    byId = true;
  }

  useEffect(() => {
    const fetchData = () => {
      dispatch(getDepositsWithdrawsByAgent(weeknumber,byId,sub))
    }
    fetchData();
  }, [dispatch, weeknumber, byId, sub])  

  const deposits = useSelector(store => store.agent.datadeposit);
  const withdraws = useSelector(store => store.agent.datawithdraw);

  const month_name = function(dt){
    var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return mlist[dt.getMonth()];
  };

  let month = month_name(moment().subtract(weeknumber, 'weeks').startOf('week').toDate()).toUpperCase();
  let monthNext = month_name(moment().subtract(weeknumber, 'weeks').endOf('week').toDate()).toUpperCase();

  if (month !== monthNext) {
    month = `${month} - ${monthNext}`
  }

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

  const data = [
    {
      name: mondaydesc, deposit: 0, withdraw: 0,
    },
    {
      name: tuesdaydesc, deposit: 0, withdraw: 0,
    },
    {
      name: wednesdaydesc, deposit: 0, withdraw: 0,
    },
    {
      name: thursdaydesc, deposit: 0, withdraw: 0,
    },
    {
      name: fridaydesc, deposit: 0, withdraw: 0,
    },
    {
      name: saturdaydesc, deposit: 0, withdraw: 0,
    },
    {
      name: sundaydesc, deposit: 0, withdraw: 0,
    }
  ];

  if(deposits){
    deposits.forEach( rowD => {
      rowD.days.forEach( dayD => {
        switch(dayD.day) {
          case 2:
            data[0].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          case 3:
            data[1].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          case 4:
            data[2].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          case 5:
            data[3].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          case 6:
            data[4].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          case 7:
            data[4].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          case 1:
            data[6].deposit=parseFloat(dayD.total).toFixed(2);
            break;
          default:
            break;
        }
      })
    })
  }

  if(withdraws){
    withdraws.forEach( row => {
      row.days.forEach( day => {
        switch(day.day) {
          case 2:
            data[0].withdraw=parseFloat(day.total).toFixed(2);
            break;
          case 3:
            data[1].withdraw=parseFloat(day.total).toFixed(2);
            break;
          case 4:
            data[2].withdraw=parseFloat(day.total).toFixed(2);
            break;
          case 5:
            data[3].withdraw=parseFloat(day.total).toFixed(2);
            break;
          case 6:
            data[4].withdraw=parseFloat(day.total).toFixed(2);
            break;
          case 7:
            data[5].withdraw=parseFloat(day.total).toFixed(2);
            break;
          case 1:
            data[6].withdraw=parseFloat(day.total).toFixed(2);
            break;
          default:
            break;
        }
      })
    })
  }

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
    document.body.style.cursor='wait';
    dispatch(getDepositsWithdrawsByAgent(page,byId,sub))
    setWeek(page);
    document.body.style.cursor='default';
  };  

  return (
    <>
      <div>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow key='200002' className={classes.header}>
                <TableCell className={classes.header}>
                  {`Weekly Chart ${month}`}
                </TableCell>
                <TableCell align='right'>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  startIcon={<NavigateBeforeIcon style={{ color: 'white' }}/>}
                  onClick={() => {
                    handleChangePage(-1)
                  }}
                >
                  Previous Week
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  startIcon={<NavigateNextIcon style={{ color: 'white' }}/>}
                  onClick={() => {
                    handleChangePage(1)
                  }}
                >
                  Next Week
                </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ width: '100%', height: 300 }}>      
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="deposit" stroke="#6b8e37" fill="#6b8e37" />
            <Line type="monotone" dataKey="withdraw" stroke="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default DepositsWithdrawsChart
