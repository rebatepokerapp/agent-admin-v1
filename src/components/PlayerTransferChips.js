import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PlayerCashOptions from './PlayerCashOptions';
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getPlayerData,setPlayerInfo} from '../redux/PlayerDucks';


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

const PlayerOptions = () => {

  const classes = useStyles();
  const maincontainer = clsx(classes.main); 

  const { id } = useParams();

  const params = id.split('&');

  const idreal = params[0];
  const username = params[1];

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setPlayerInfo(idreal,username));
    dispatch(getPlayerData())
  },[idreal, username, dispatch])

  const player = useSelector(store => store.player.data);

  return player ? (
    <div className={maincontainer}>
      <div>
        <div><PlayerCashOptions player={player}/></div>
      </div>
    </div>


        
  ):null
}

export default PlayerOptions
