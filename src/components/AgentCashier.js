import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import RequestDeposit from './CashierDepositDlg';
import RequestWithdraw from './CashierWithdrawDlg';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {getAgentPlayersWithdraws,getAgentPlayersDeposits} from '../redux/AgentDucks';
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment';
import DepositWithdrawChart from './DepositsWithdrawsChart';
import clsx from 'clsx';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    alignContent: 'center',
    alignItems: 'center',
  },
  mainDiv: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },
  title: {
    margin: '5px',
    marginLeft: '10px',
    color: 'green',
    marginTop: '10px',
    fontSize: '24px',
  },
  results: {
    margin: '5px',
    marginLeft: '30px',
    color: 'green',
    marginTop: '10px',
    fontSize: '18px',
    alignContent: 'center',
  },
  results_a: {
    margin: '5px',
    marginLeft: '30px',
    color: 'blue',
    marginTop: '10px',
    fontSize: '18px',
    alignContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    boxSizing: 'border-box',
    width: '75%',
    borderRadius: '4px',
    border: '1px solid #AAAAAA',
    padding: '10px 15px',
    marginBottom: '10px',
    fontSize: '14px',
    marginTop: '10px',
    marginLeft: '20px',
    alignItems: 'center',
    alignSelf: 'center',
  },

  inputcmb: {
    marginBottom: '10px',
    width: '75%',
    marginTop: '10px',
    marginLeft: '20px',
  },

  submit: {
    color: '#000000',
    backgroundColor: '#FF9A00',
    fontWeight: '700',
    ':hover': {
      backgroundColor: '#FFCC00'
    },
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px',
    width: '35%'
  },
  alerttext: {
    color: 'red'
  },
}));


const AgentCashier = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const now = moment();
  
  let start = 0;
  let length = 0;
  let startDate = now.startOf('day')
  let agentid = useSelector(store => store.agent.agentsession);

  useEffect(() => {  
    dispatch(getAgentPlayersWithdraws(start,length,startDate));
    dispatch(getAgentPlayersDeposits(start,length,startDate));   
  },[dispatch])

  const playersWithdraws = useSelector(store => store.agent.playersWithdraws);
  const playersDeposits = useSelector(store => store.agent.playersDeposits);
    
  const maincontainer = clsx(classes.mainDiv);

  return (
    <div  className={maincontainer}>
      <RequestDeposit />
      <RequestWithdraw />
      <DepositWithdrawChart />      
      <MaterialTable
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: '#666666',
            color: '#FFF'
          },
          search: true,
          exportButton: true,
          default: "dense",
          paging: true,
          filtering: true,
          isLoading: true,
          pageSize: 5

        }}
        title={`Today's deposits`}
        columns={[
          { title: "Player", field: "player", filtering: false},
          { title: "Crypto Currency", field: "cryptoCurrency", filtering: false},
          { title: "Crypto Amount", field: "cryptoAmount", filtering: false, render: rowData => rowData.cryptoCurrency==='BTC'?parseFloat(rowData.cryptoAmount).toFixed(8):rowData.cryptoCurrency==='ETH'?parseFloat(rowData.cryptoAmount).toFixed(14):rowData.cryptoCurrency==='USDC'?parseFloat(rowData.cryptoAmount).toFixed(2):0},
          { title: "Amount", field: "currencyApply", filtering: false, cellStyle: {color:'green'}, render: rowData => rowData.currencyApply?parseFloat(rowData.currencyApply).toFixed(2):0},
          { title: "Processed", field: "processed", filtering: false},
          { title: "Date", field: "createdAt", filtering: false, render: rowData => moment(rowData.createdAt).format("YYYY/MM/DD hh:mm")},
        ]}
        data={playersDeposits}        
      />
      <MaterialTable
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: '#666666',
            color: '#FFF'
          },
          search: true,
          exportButton: true,
          default: "dense",
          paging:true,
          filtering: true,
          isLoading: true,
          pageSize: 5

        }}
        title={`Today's withdrawals`}
        columns={[
          { title: "Player", field: "player", filtering: false},
          { title: "Crypto Currency", field: "cryptoCurrency", filtering: false},
          { title: "Crypto Amount", field: "cryptoAmount", filtering: false, render: rowData => rowData.cryptoCurrency==='BTC'?parseFloat(rowData.cryptoAmount).toFixed(8):rowData.cryptoCurrency==='ETH'?parseFloat(rowData.cryptoAmount).toFixed(14):rowData.cryptoCurrency==='USDC'?parseFloat(rowData.cryptoAmount).toFixed(2):0},
          { title: "Amount", field: "currencyApply", filtering: false, cellStyle: {color:'red'}, render: rowData => rowData.currencyApply?parseFloat(rowData.currencyApply).toFixed(2):0},
          { title: "Processed", field: "processed", filtering: false},
          { title: "Date", field: "createdAt", filtering: false, render: rowData => moment(rowData.createdAt).format("YYYY/MM/DD hh:mm")},
        ]}
        data={playersWithdraws}        
      />      
    </div>            
  )
}

export default AgentCashier
