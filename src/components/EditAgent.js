import React, {useEffect, useState} from 'react';
import {getAgentData,setAgentInfo} from '../redux/AgentDucks';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import EditAgentForm from './EditAgentForm';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    maxWidth: '100%', 
    margin: '0',
    padding: '0',
    verticalAlign: 'top',
  },
}));

const EditAgent = () => {
  const { id } = useParams();

  const params = id.split('&');

  const classes = useStyles();
  const maincontainer = clsx(classes.main); 
  const [idreal] = useState(params[0])
  const [username] = useState(params[1])

  const dispatch = useDispatch(); 

  useEffect(() => {  
    dispatch(setAgentInfo(idreal,username))
    dispatch(getAgentData())
  },[idreal, username, dispatch])

  const agent = useSelector(store => store.agent.data);

  return agent ? (
    <div  className={maincontainer}>
      <div><EditAgentForm agent={agent}/></div>
    </div>
  ): null;
}

export default EditAgent
