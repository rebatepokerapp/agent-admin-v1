import React, {useEffect} from 'react';
import {getAgentData,setAgentInfo} from '../redux/AgentDucks';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import EditAgentForm from './EditAgentForm';

const EditAgent = () => {
  const { id } = useParams();

  const params = id.split('&');

  const idreal = params[0];
  const username = params[1];

  const dispatch = useDispatch();

  const setAgent = () => {
    dispatch(setAgentInfo(idreal,username));
  }

  useEffect(() => {
    setAgent();
    dispatch(getAgentData())
  },[dispatch])

  const agent = useSelector(store => store.agent.data);

  return (
    <div className="container">
      <div><EditAgentForm agent={agent}/></div>
    </div>
  )
}

export default EditAgent
