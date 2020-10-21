import React from 'react'
import AgentCashTransactionHistory from './AgentCashTransactionHistory';
import {useSelector} from 'react-redux';

const AgentCashHistory = () => {
  const agent = useSelector(store => store.agent.agentsession);
  return (
    <AgentCashTransactionHistory id={agent.id} username={agent.username}/>
  )
}

export default AgentCashHistory
