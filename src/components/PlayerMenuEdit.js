import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PlayerEditFormDlg from './PlayerEditFormDlg';
import PlayerGameHistoryDlg from './PlayerGameHistoryDlg';
import PlayerCashTransactionsDlg from './PlayerCashTransactionsDlg';
import PlayerIpHistoryDlg from './PlayerIpHistoryDlg';
import PlayerProfileInfoDlg from './PlayerProfileInfoDlg';

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

const PlayerMenuEdit = ({ id, username }) => {

  const classes = useStyles(); 

  const handleClose = (from,id,player) => {    
    if(from === 'GH'){
      var urlred = `/app/gameHistory/${id}&${player}`
      window.location.href=urlred;
    } else if(from === 'CT') {
      urlred = `/app/cashtransactionhistory/${id}&${player}`
      window.location.href=urlred;
    } else if(from === 'PO') {
      urlred = `/app/playeroptions/${id}&${player}`
      window.location.href=urlred;
    } else if(from === 'TC') {
      urlred = `/app/playertransferchips/${id}&${player}`
      window.location.href=urlred;
    } else if(from === 'IP') {
      urlred = `/app/playeriphistory/${id}&${player}`
      window.location.href=urlred;
    } else if(from === 'PA') {
      urlred = `/app/playerprofile/${id}&${player}`
      window.location.href=urlred;
    }       
  };  

  return (
    <ul className={classes.nav} >  
      <li className={classes.navli}><PlayerEditFormDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerGameHistoryDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerCashTransactionsDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerIpHistoryDlg id={id} username={username} /></li>
      <li className={classes.navli}><PlayerProfileInfoDlg id={id} username={username} /></li>
    </ul>
  )
}

export default PlayerMenuEdit
