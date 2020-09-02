import React, {useEffect} from 'react';
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
    <div  className={maincontainer}>
      <div><EditAgentForm agent={agent}/></div>
    </div>
  )
}

export default EditAgent
