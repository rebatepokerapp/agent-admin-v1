import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PlayerEditFormDlg from './PlayerEditFormDlg';
import PlayerGameHistoryDlg from './PlayerGameHistoryDlg';
import PlayerCashTransactionsDlg from './PlayerCashTransactionsDlg';
import PlayerIpHistoryDlg from './PlayerIpHistoryDlg';
import PlayerProfileInfoDlg from './PlayerProfileInfoDlg';
import RequestBalanceDlg from './RequestBalanceDlg';
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

const PlayerMenuEdit = ({ id, username, allowDeposits, allowWithdrawals }) => {

  const classes = useStyles();
  
  let agentSession = useSelector(store => store.agent.agentsession); 

  return (
    <ul className={classes.nav} >  
      <li className={classes.navli}><PlayerEditFormDlg id={id} username={username} allowDeposits={allowDeposits} allowWithdrawals={allowWithdrawals} /></li>
      <li className={classes.navli}><PlayerGameHistoryDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerCashTransactionsDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerIpHistoryDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerProfileInfoDlg id={id} username={username} /></li>
      {agentSession.allowTranferPlayer?
        <li className={classes.navli}><RequestBalanceDlg id={id} username={username} isplayer="true" /></li>
      :''}
      
    </ul>
  )
}

export default PlayerMenuEdit
