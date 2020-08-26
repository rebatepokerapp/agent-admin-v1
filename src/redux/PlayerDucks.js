import axios from 'axios';
import { API_AGENT_URL } from '../config';

//constantes o variables de estado del player seleccionado
const playerData = {
  player: null,
  username: '',
  gamehistory: null,
  transactions: null,
  iplist: null,
  error: null
}

const PLAYER_GAME_HISTORY_SUCCESS = 'PLAYER_GAME_HISTORY_SUCCESS';
const PLAYER_GAME_HISTORY_ERROR = 'PLAYER_GAME_HISTORY_ERROR';
const PLAYER_TRANSACTION_HISTORY_SUCCESS = 'PLAYER_TRANSACTION_HISTORY_SUCCESS';
const PLAYER_TRANSACTION_HISTORY_ERROR = 'PLAYER_TRANSACTION_HISTORY_ERROR';
const PLAYER_IP_HISTORY_SUCCESS = 'PLAYER_IP_HISTORY_SUCCESS';
const PLAYER_IP_HISTORY_ERROR = 'PLAYER_IP_HISTORY_ERROR';
const SET_PLAYER_INFO_SUCCESSS = 'SET_PLAYER_INFO_SUCCESSS' 
const SET_PLAYER_INFO_ERROR = 'SET_PLAYER_INFO_ERROR' 


//Reducer
//Establece el seteo de los estados de acuerdo a la accion enviada
export default function playerReducer(state = playerData, action){
  switch(action.type){
    case PLAYER_GAME_HISTORY_SUCCESS:
      return{...state, gamehistory: action.payload}
    case PLAYER_GAME_HISTORY_ERROR:
      return{...state, error: action.payload}
    case PLAYER_TRANSACTION_HISTORY_SUCCESS:
      return{...state, transactions: action.payload}
    case PLAYER_TRANSACTION_HISTORY_ERROR:
      return{...state, error: action.payload}
    case PLAYER_IP_HISTORY_SUCCESS:
      return{...state, iplist: action.payload}
    case PLAYER_IP_HISTORY_ERROR:
      return{...state, error: action.payload}
    case SET_PLAYER_INFO_SUCCESSS:
      return{...state, player: action.payload.id, username: action.payload.username}
    case SET_PLAYER_INFO_ERROR:
      return{...state, error: action.payload}
    default:
      return state
  }
}

export const setPlayerInfo = (id,player) => async (dispatch, getState) => {
  dispatch({
    type: SET_PLAYER_INFO_SUCCESSS,
    payload: {
      id: id,
      username: player
    }
  })
}

export const getPlayerGameHistory = () => async  (dispatch, getState) => {
  try {
    const query =  {
      start: 0,
      length:0,
      search: ''
    }
    const id = getState().player.player;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    console.log('PLAYER ID', id)
    const res = await axios.get(`${API_AGENT_URL}/player/gameHistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { 'Origin': '', 'Host': 'http://agent.rebate.poker', Authorization: AuthStr, agent: agent }});
    console.log('DATA', res.data)
    dispatch({
      type: PLAYER_GAME_HISTORY_SUCCESS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: PLAYER_GAME_HISTORY_ERROR,
      payload: 'Error getting player game history'
    })
  }
}

export const getPlayerTransCashHistory = () => async  (dispatch, getState) => {
  try {
    const query =  {
      start: 0,
      length:0,
      search: ''
    }
    const id = getState().player.player;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/player/cashTransHistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { 'Origin': '', 'Host': 'http://agent.rebate.poker', Authorization: AuthStr, agent: agent }});
    dispatch({
      type: PLAYER_TRANSACTION_HISTORY_SUCCESS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: PLAYER_TRANSACTION_HISTORY_ERROR,
      payload: 'Error getting player game history'
    })
  }
}

export const getPlayerIpLoginHistory = () => async  (dispatch, getState) => {
  try {
    const query =  {
      start: 0,
      length:0,
      search: ''
    }
    const id = getState().player.player;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/player/iploginhistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { 'Origin': '', 'Host': 'http://agent.rebate.poker', Authorization: AuthStr, agent: agent }});
    console.log(res.data.data);
    dispatch({
      type: PLAYER_IP_HISTORY_SUCCESS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: PLAYER_IP_HISTORY_ERROR,
      payload: 'Error getting player game history'
    })
  }
}
