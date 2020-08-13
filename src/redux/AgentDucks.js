import axios from 'axios';
import { API_AGENT_URL } from '../config';

//constantes o variables de estado del agente
const agentData = {
  agent: null,
  isAuthenticated: JSON.parse(localStorage.getItem('jwt')),
  players:[],
  subagents: [],
  figures: [],
  error: null,
  token: null
}

const AGENT_LOGIN_SUCCESS = 'AGENT_LOGIN_SUCCESS';
const AGENT_LOGIN_ERROR = 'AGENT_LOGIN_ERROR';
const AGENT_LOGOUT_SUCCESS = 'AGENT_LOGOUT_SUCCESS';
const AGENT_LOGOUT_ERROR = 'AGENT_LOGOUT_ERROR';
const GET_AGENT_PLAYERS_SUCCESS = 'GET_AGENT_PLAYERS_SUCCESS';
const GET_AGENT_PLAYERS_ERROR = 'GET_AGENT_PLAYERS_ERROR';
const GET_AGENT_SUBS_SUCCESS = 'GET_AGENT_SUBS_SUCCESS';
const GET_AGENT_SUBS_ERROR = 'GET_AGENT_SUBS_ERROR';
const GET_AGENT_FIGURES_SUCCESS = 'GET_AGENT_FIGURES_SUCCESS';
const GET_AGENT_FIGURES_ERROR = 'GET_AGENT_FIGURES_ERROR';


//Reducer
//Establece el seteo de los estados de acuerdo a la accion enviada
export default function agentReducer(state = agentData, action){
  switch(action.type){
    case AGENT_LOGIN_SUCCESS:
      return{...state, agent: action.payload.agent, isAuthenticated: true, token: action.payload.token, error: null}
    case AGENT_LOGOUT_SUCCESS:      
      return{...state, agent: null, isAuthenticated: false, token: null, players:[], subagents:[], figures:[], error: null}
    case GET_AGENT_PLAYERS_SUCCESS:
      return{...state, players: action.payload, error: null}
    case GET_AGENT_SUBS_SUCCESS:
      return{...state, subagents: action.payload, error: null}
    case GET_AGENT_FIGURES_SUCCESS:
      return{...state, figures: action.payload, error: null}
    case AGENT_LOGIN_ERROR:
      return{...state, error: action.payload}
    case AGENT_LOGOUT_ERROR:
      return{...state, error: action.payload}
    case GET_AGENT_PLAYERS_ERROR:
      return{...state, error: action.payload}
    case GET_AGENT_SUBS_ERROR:
      return{...state, error: action.payload}
    case GET_AGENT_FIGURES_ERROR:
      return{...state, error: action.payload}
    default:
      return state
  }
}

export const signIn = (user) => async  (dispatch, getState) => {
  try {
    const res = await axios.post(`${API_AGENT_URL}/loginagent`, user);
    if(typeof window !== 'undefined'){
      localStorage.setItem('jwt', JSON.stringify(res.data));
    }
    dispatch({
      type: AGENT_LOGIN_SUCCESS,
      payload: {
        agent: res.data.agent,
        isAuthenticated: true,
        token: JSON.parse(localStorage.getItem('jwt'))
      }
    })    
  } catch (error) {
    dispatch({
      type: AGENT_LOGIN_ERROR,
      payload: 'Wrong username or password'
    })
  }
}

export const signOut = () => async  (dispatch, getState) => {
  try {
    localStorage.clear();
    dispatch({
      type: AGENT_LOGOUT_SUCCESS,
      payload: null
    })
  } catch (error) {
    dispatch({
      type: AGENT_LOGOUT_ERROR,
      payload: 'Error login out'
    })
  }
}


export const getPlayersByAgent = () => async  (dispatch, getState) => {
  try {
    const { id } = getState().agent.agent;
    const res = await axios.get(`${API_AGENT_URL}/playerbyagent/${id}`);
    dispatch({
      type: GET_AGENT_PLAYERS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_PLAYERS_ERROR,
      payload: 'Error geting players by agent'
    })
  }
}

export const getSubsByAgent = () => async  (dispatch, getState) => {
  try {
    const query =  {
      start_date: "2020-06-23",
      end_date: "2020-06-28",
      is_datefilter:'1'
    }
    const { id } = getState().agent.agent;
    const res = await axios.get(`${API_AGENT_URL}/subsbyagent/${id}?start_date=${query.start_date}&end_date=${query.end_date}&is_datefilter=${query.is_datefilter}`);
    dispatch({
      type: GET_AGENT_SUBS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_SUBS_ERROR,
      payload: 'Error getting sub agents by agent'
    })
  }
}

export const getFiguresByAgent = () => async  (dispatch, getState) => {
  try {
    const query =  {
      start_date: "2020-06-23",
      end_date: "2020-06-28",
      is_datefilter:'1'
    }

    const { id } = getState().agent.agent;
    const res = await axios.get(`${API_AGENT_URL}/figuresbyagent/${id}?start_date=${query.start_date}&end_date=${query.end_date}&is_datefilter=${query.is_datefilter}`);

    dispatch({
      type: GET_AGENT_FIGURES_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_FIGURES_ERROR,
      payload: 'Error loading figures by agent'
    })
  }
}