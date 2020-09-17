import axios from 'axios';
import { API_AGENT_URL } from '../config';

//constantes o variables de estado del player seleccionado
const playerData = {
  player: null,
  username: '',
  gamehistory: null,
  transactions: null,
  data: null,
  statistics: null,
  messageupdate:'',
  iplist: null,
  error: null,
  validate: ''
}

const PLAYER_GAME_HISTORY_SUCCESS = 'PLAYER_GAME_HISTORY_SUCCESS';
const PLAYER_GAME_HISTORY_ERROR = 'PLAYER_GAME_HISTORY_ERROR';
const PLAYER_TRANSACTION_HISTORY_SUCCESS = 'PLAYER_TRANSACTION_HISTORY_SUCCESS';
const PLAYER_TRANSACTION_HISTORY_ERROR = 'PLAYER_TRANSACTION_HISTORY_ERROR';
const PLAYER_IP_HISTORY_SUCCESS = 'PLAYER_IP_HISTORY_SUCCESS';
const PLAYER_IP_HISTORY_ERROR = 'PLAYER_IP_HISTORY_ERROR';
const SET_PLAYER_INFO_SUCCESSS = 'SET_PLAYER_INFO_SUCCESSS' 
const SET_PLAYER_INFO_ERROR = 'SET_PLAYER_INFO_ERROR' 
const GET_PLAYER_INFO_SUCCESS = 'GET_PLAYER_INFO_SUCCESS'
const GET_PLAYER_INFO_ERROR = 'GET_PLAYER_INFO_ERROR'
const UPDATE_PLAYER_INFO_SUCCESS = 'UPDATE_PLAYER_INFO_SUCCESS'
const UPDATE_PLAYER_INFO_ERROR = 'UPDATE_PLAYER_INFO_ERROR'
const GET_PLAYER_PROFILE_SUCCESS = 'GET_PLAYER_PROFILE_SUCCESS'
const GET_PLAYER_PROFILE_ERROR = 'GET_PLAYER_PROFILE_ERROR'
const VALIDATE_PLAYER_EMAIL_SUCCESS = 'VALIDATE_PLAYER_EMAIL_SUCCESS'
const VALIDATE_PLAYER_EMAIL_ERROR = 'VALIDATE_PLAYER_EMAIL_ERROR'
const ADD_PLAYER_INFO_SUCCESS = 'ADD_PLAYER_INFO_SUCCESS'
const ADD_PLAYER_INFO_ERROR = 'ADD_PLAYER_INFO_ERROR'
const SET_PLAYER_MESSAGES_SUCCESSS = 'SET_PLAYER_MESSAGES_SUCCESSS'
const VALIDATE_PLAYER_USERNAME_SUCCESS = 'VALIDATE_PLAYER_USERNAME_SUCCESS'
const VALIDATE_PLAYER_USERNAME_ERROR = 'VALIDATE_PLAYER_USERNAME_ERROR'


//Reducer
//Establece el seteo de los estados de acuerdo a la accion enviada
export default function playerReducer(state = playerData, action){
  switch(action.type){
    case PLAYER_GAME_HISTORY_SUCCESS:
      return{...state, gamehistory: action.payload, error: null, messageupdate: null}
    case PLAYER_GAME_HISTORY_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case PLAYER_TRANSACTION_HISTORY_SUCCESS:
      return{...state, transactions: action.payload, error: null, messageupdate: null}
    case PLAYER_TRANSACTION_HISTORY_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case PLAYER_IP_HISTORY_SUCCESS:
      return{...state, iplist: action.payload, error: null, messageupdate: null}
    case PLAYER_IP_HISTORY_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case SET_PLAYER_INFO_SUCCESSS:
      return{...state, player: action.payload.id, username: action.payload.username, data: null, error: null, messageupdate: null}
    case SET_PLAYER_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case GET_PLAYER_INFO_SUCCESS:
      return{...state, data: action.payload, error: null, messageupdate: null}
    case GET_PLAYER_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case UPDATE_PLAYER_INFO_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.player, error: null}
    case UPDATE_PLAYER_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}    
    case GET_PLAYER_PROFILE_SUCCESS:
      return{...state, statistics: action.payload,  messageupdate: null, error: null}
    case GET_PLAYER_PROFILE_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case VALIDATE_PLAYER_EMAIL_SUCCESS:
      return{...state, validate: action.payload,messageupdate: null, error: null}
    case VALIDATE_PLAYER_EMAIL_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case ADD_PLAYER_INFO_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.player, error: null, transactions: null, gamehistory: null, statistics: null, iplist: null}
    case ADD_PLAYER_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case SET_PLAYER_MESSAGES_SUCCESSS:
      return{...state, error: null, messageupdate: null}
    case VALIDATE_PLAYER_USERNAME_SUCCESS:
      return{...state, validate: action.payload,messageupdate: null, error: null}
    case VALIDATE_PLAYER_USERNAME_ERROR:
      return{...state, error: action.payload, messageupdate: null}
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

export const setPlayerMessagesError = () => async (dispatch, getState) => {
  dispatch({
    type: SET_PLAYER_MESSAGES_SUCCESSS,
    payload: null
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
    const res = await axios.get(`${API_AGENT_URL}/player/gameHistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});
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
    const res = await axios.get(`${API_AGENT_URL}/player/cashTransHistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});
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
    const res = await axios.get(`${API_AGENT_URL}/player/iploginhistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});
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

export const getPlayerData = () => async  (dispatch, getState) => {
  try {
    const id = getState().player.player;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/player/edit/${id}`,{ headers: { Authorization: AuthStr, agent: agent }});
    let playertemp = null;

    if(res.data.player){
      playertemp = {
        _id: res.data.player._id,
        username: res.data.player.username,
        firstname: res.data.player.firstname,
        lastname: res.data.player.lastname,
        email: res.data.player.email,
        gender: res.data.player.gender,
        status: res.data.player.status
      }
    }

    dispatch({
      type: GET_PLAYER_INFO_SUCCESS,
      payload: playertemp
    })
  } catch (error) {
    dispatch({
      type: GET_PLAYER_INFO_ERROR,
      payload: 'Error getting player data'
    })
  }
}

export const editPlayerData = (data) => async  (dispatch, getState) => {
  try {
    const id = getState().player.player;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/player/edit/${id}`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: UPDATE_PLAYER_INFO_SUCCESS,
      payload: {
        player:res.data.player,
        message: 'Player data updated'
      }
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PLAYER_INFO_ERROR,
      payload: 'Error updating player data'
    })
  }
}

export const getPlayerProfile = () => async  (dispatch, getState) => {
  try {
    const id = getState().player.player;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/player/profile/${id}`,{ headers: { Authorization: AuthStr, agent: agent }});
    let result = null;
    if(res.data){
      result = {
        username: res.data.player.username,
        gamePlay: res.data.player.statistics.cashgame.noOfPlayedGames,
        gameWon: res.data.player.statistics.cashgame.totalWonGame,
        gameLost: res.data.player.statistics.cashgame.totalLoseGame,
        tournamentPlay: res.data.player.statistics.tournament.noOfPlayedGames,
        tournamentWon: res.data.player.statistics.tournament.totalWonGame,
        todayRake: res.data.todayRakeTotal,
        weekRake: res.data.weekallyRakeTotal,
        monthRake: res.data.monthallyRakeTotal,
      }
    }
    dispatch({
      type: GET_PLAYER_PROFILE_SUCCESS,
      payload: result
    });

  } catch (error) {
    dispatch({
      type: GET_PLAYER_PROFILE_ERROR,
      payload: 'Error getting player data'
    });
  }
}

export const validateEmail = (data) => async  (dispatch, getState) => {
  try {   
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    await axios.post(`${API_AGENT_URL}/player/checkemail`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: VALIDATE_PLAYER_EMAIL_SUCCESS,
      payload: 'OK'
    })
  } catch (error) {
    dispatch({
      type: VALIDATE_PLAYER_EMAIL_ERROR,
      payload: 'Email already exist'
    })
  }
}

export const validateUsername = (data) => async  (dispatch, getState) => {
  try {   
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    await axios.post(`${API_AGENT_URL}/player/checkusername`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: VALIDATE_PLAYER_USERNAME_SUCCESS,
      payload: 'OK'
    })
  } catch (error) {
    dispatch({
      type: VALIDATE_PLAYER_USERNAME_ERROR,
      payload: 'Username already exist'
    })
  }
}

export const addPlayerData = (data) => async  (dispatch, getState) => {
  try {   
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/player/addplayer`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: ADD_PLAYER_INFO_SUCCESS,
      payload: {
        player: res.data.player,
        message: 'Player inserted'
      }
    })
  } catch (error) {
    dispatch({
      type: ADD_PLAYER_INFO_ERROR,
      payload: 'Error inserting player data'
    })
  }
}
