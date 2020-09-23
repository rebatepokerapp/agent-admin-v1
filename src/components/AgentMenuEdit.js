import React, { Fragment } from 'react'
import EditAgentFormDlg from './EditAgentFormDlg';
import RequestBalanceDlg from './RequestBalanceDlg';
import FiguresReportDlg from './FiguresReportDlg';
import AgentCashTransHistoryDlg from './AgentCashTransHistoryDlg';


//Crea el componente de menu para los player en el player list
const AgentMenuEdit = ({ id, agent }) => {

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

  return (
    <Fragment>      
      <EditAgentFormDlg id={id} username={agent} />
      <RequestBalanceDlg id={id} username={agent} />
      <FiguresReportDlg id={id} username={agent} />
      <AgentCashTransHistoryDlg id={id} username={agent} />
    </Fragment>
  )
}

export default AgentMenuEdit
