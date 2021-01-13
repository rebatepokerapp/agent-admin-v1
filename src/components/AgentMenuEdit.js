import React from 'react'
import EditAgentFormDlg from './EditAgentFormDlg';
import RequestBalanceDlg from './RequestBalanceDlg';
import FiguresReportDlg from './FiguresReportDlg';
import AgentCashTransHistoryDlg from './AgentCashTransHistoryDlg';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  nav: {
    listStyleType: 'none',
    margin: 0,
    padding: 0, 
    whiteSpace: 'nowrap', 
  },
  navli:{
    display: 'inline-block',
  }
  
}));


//Crea el componente de menu para los player en el player list
const AgentMenuEdit = ({ id, agent, isTransferAllow, allowDeposits, allowWithdrawals, allowTranferPlayer, allowTransferAgent}) => {

  const classes = useStyles();

  let agentSession = useSelector(store => store.agent.agentsession);

  var urlred = '';

  const handleClose = (from,id,player) => {    
    if(from === 'EA'){
      console.log('acaaaaaaaaaaaa')
    } else if(from === 'RH') {
      urlred = `/app/rakehistory/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'CH') {
      urlred = `/app/cashhistory/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'TC') {
      urlred = `/app/transferchips/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'RC') {
      urlred = `/app/requestcash/${id}&${agent}`
      window.location.href=urlred;
    } else if(from === 'CN') {
      urlred = `/app/chipsnotes/${id}&${agent}`
      window.location.href=urlred;
    }       
  };  

  return agentSession?(
    <ul className={classes.nav} >  
      <li nowrap className={classes.navli}><EditAgentFormDlg id={id} username={agent} isTransferAllow={isTransferAllow} allowDeposits={allowDeposits} allowWithdrawals={allowWithdrawals} allowTranferPlayer={allowTranferPlayer} allowTransferAgent={allowTransferAgent} /></li>
      {agentSession.allowTransferAgent?
        <li className={classes.navli}><RequestBalanceDlg id={id} username={agent} isplayer="false" /></li>
      :''}      
      <li className={classes.navli}><FiguresReportDlg id={id} username={agent} /></li>
      <li className={classes.navli}><AgentCashTransHistoryDlg id={id} username={agent} /></li>
    </ul>              
  ):null
}

export default AgentMenuEdit
