import React, {useEffect} from 'react';
import PlayerCashOptions from './PlayerCashOptions';
import PlayerEditForm from './PlayerEditForm';
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getPlayerData,setPlayerInfo} from '../redux/PlayerDucks';

const PlayerOptions = () => {
  const { id } = useParams();

  const params = id.split('&');

  const idreal = params[0];
  const username = params[1];

  const dispatch = useDispatch();

  const setPlayer = () => {
    dispatch(setPlayerInfo(idreal,username));
  }

  useEffect(() => {
    setPlayer();
    dispatch(getPlayerData())
  },[dispatch])

  const player = useSelector(store => store.player.data);
  
  return player ? (
    <div className="container">
      <div><PlayerEditForm player={player}/></div>
      <div><PlayerCashOptions player={player}/></div>
    </div>    
  ):null
}

export default PlayerOptions
