import axios from 'axios';
import { API_AGENT_URL } from '../config';
import moment from 'moment';

//constantes o variables de estado del agente
const agentData = {
  id: null,
  username: '',
  agentsession: null,
  agent: null,
  data: null,
  isAuthenticated: false,
  players:[],
  subagents: [],
  figures: [],
  totalrake:0,
  totalperday:[],
  error: null,
  token: null,
  lastThreeWeeks: null,
  messageupdate: null,
  transactions: null,
  dashboard: null,
  rakebalance: 0,
  balance: 0,
  recordsTotal: 0,
  recordsFiltered: 0,
  menustate: false
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
const SET_AGENT_INFO_SUCCESSS = 'SET_AGENT_INFO_SUCCESSS'
const SET_AGENT_INFO_ERROR = 'SET_AGENT_INFO_ERROR'
const GET_AGENT_INFO_SUCCESS = 'GET_AGENT_INFO_SUCCESS'
const GET_AGENT_INFO_ERROR = 'GET_AGENT_INFO_ERROR'
const UPDATE_AGENT_INFO_SUCCESS = 'UPDATE_AGENT_INFO_SUCCESS'
const UPDATE_AGENT_INFO_ERROR = 'UPDATE_AGENT_INFO_ERROR'
const ADD_AGENT_INFO_SUCCESS = 'ADD_AGENT_INFO_SUCCESS'
const ADD_AGENT_INFO_ERROR = 'ADD_AGENT_INFO_ERROR'
const LAST_THREE_WEEKS_SUCCESS = 'LAST_THREE_WEEKS_SUCCESS'
const LAST_THREE_WEEKS_ERROR = 'LAST_THREE_WEEKS_ERROR'
const AGENT_TRANSACTION_HISTORY_SUCCESS = 'AGENT_TRANSACTION_HISTORY_SUCCESS'
const AGENT_TRANSACTION_HISTORY_ERROR = 'AGENT_TRANSACTION_HISTORY_ERROR'
const GET_AGENT_DASHBOARD_SUCCESS = 'GET_AGENT_DASHBOARD_SUCCESS'
const GET_AGENT_DASHBOARD_ERROR = 'GET_AGENT_DASHBOARD_ERROR'
const SET_AGENT_BALANCE_SUCCESSS = 'SET_AGENT_BALANCE_SUCCESSS'
const AGENT_TRANSFER_SUCCESS = 'AGENT_TRANSFER_SUCCESS'
const AGENT_TRANSFER_ERROR = 'AGENT_TRANSFER_ERROR'
const AGENT_REQUEST_BALANCE_SUCCESS = 'AGENT_REQUEST_BALANCE_SUCCESS'
const AGENT_REQUEST_BALANCE_ERROR = 'AGENT_REQUEST_BALANCE_ERROR'
const SET_MENU_STATE_SUCCESSS = 'SET_MENU_STATE_SUCCESSS'
const SET_ERROR_SUCCESSS = 'SET_ERROR_SUCCESSS'
const AGENT_CHANGE_PASSWORD_SUCCESS = 'AGENT_CHANGE_PASSWORD_SUCCESS'
const AGENT_CHANGE_PASSWORD_ERROR = 'AGENT_CHANGE_PASSWORD_ERROR'
 

//Reducer
//Establece el seteo de los estados de acuerdo a la accion enviada
export default function agentReducer(state = agentData, action){
  switch(action.type){
    case AGENT_LOGIN_SUCCESS:
      return{...state, agentsession: action.payload.agent, agent: action.payload.agent, rakebalance: action.payload.agent.rake_chips, balance: action.payload.agent.chips, isAuthenticated: true, token: action.payload.token, error: null, id: null, username: null, data: null, players: null, subagents: null, figures: null, totalrake: 0, totalperday: null, lastThreeWeeks: null, messageupdate: null, transactions: null, dashboard: null, menustate: false}
    case AGENT_LOGOUT_SUCCESS:      
      return{...state, agent: null, balance: 0, rakebalance: 0,isAuthenticated: false, token: null, error: null, id: null, username: null, data: null, players: null, subagents: null, figures: null, totalrake: 0, totalperday: null, lastThreeWeeks: null, messageupdate: null, transactions: null, dashboard: null, menustate: false}
    case SET_MENU_STATE_SUCCESSS:
      return{...state, menustate: action.payload, error: null}
    case GET_AGENT_PLAYERS_SUCCESS:
      return{...state, players: action.payload, error: null}
    case GET_AGENT_DASHBOARD_SUCCESS:
      return{...state, dashboard: action.payload, error: null}
    case GET_AGENT_DASHBOARD_ERROR:
      return{...state, error: action.payload}
    case GET_AGENT_SUBS_SUCCESS:
      return{...state, subagents: action.payload, error: null, messageupdate: null}
    case GET_AGENT_FIGURES_SUCCESS:
      return{...state, figures: action.payload.data, totalrake:action.payload.totalrake, totalperday: action.payload.totalperday, error: null}
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
    case SET_AGENT_INFO_SUCCESSS:
      return{...state, id: action.payload.id, username: action.payload.username, data: null, error: null, messageupdate: null, figures: null, lastThreeWeeks: null, messageupdate: null, transactions: null,}
    case SET_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case GET_AGENT_INFO_SUCCESS:
      return{...state, data: action.payload, error: null, messageupdate: null}
    case GET_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case UPDATE_AGENT_INFO_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, error: null}
    case UPDATE_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case ADD_AGENT_INFO_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, error: null}
    case ADD_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case LAST_THREE_WEEKS_SUCCESS:
      return{...state, lastThreeWeeks: action.payload.data, totalrake:action.payload.totalrake, error: null}
    case LAST_THREE_WEEKS_ERROR:
      return{...state, error: action.payload}
    case AGENT_TRANSACTION_HISTORY_SUCCESS:
      return{...state, transactions: action.payload.data, recordsTotal: action.payload.recordsTotal, recordsFiltered: action.payload.recordsFiltered, error: null, messageupdate: null}
    case AGENT_TRANSACTION_HISTORY_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case SET_AGENT_BALANCE_SUCCESSS:
      return{...state, balance: action.payload}   
    case AGENT_TRANSFER_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, rakebalance: action.payload.rakebalance, balance: action.payload.balance, error: null}
    case AGENT_TRANSFER_ERROR:
      return{...state, error: action.payload, messageupdate: null}
    case AGENT_REQUEST_BALANCE_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, rakebalance: action.payload.rakebalance, balance: action.payload.balance, error: null}
    case AGENT_REQUEST_BALANCE_ERROR:
      return{...state, error: action.payload, messageupdate: null}   
    case SET_ERROR_SUCCESSS:
      return{...state, error: action.payload.error, messageupdate: action.payload.message}  
    case AGENT_CHANGE_PASSWORD_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, error: null}
    case AGENT_CHANGE_PASSWORD_ERROR:
      return{...state, error: action.payload, messageupdate: null}    
    default:
      return state
  }
}

export const setMenuState = (state) => async (dispatch, getState) => {
  dispatch({
    type: SET_MENU_STATE_SUCCESSS,
    payload: state
  })
}

export const setAgentInfo = (id,agent) => async (dispatch, getState) => {
  dispatch({
    type: SET_AGENT_INFO_SUCCESSS,
    payload: {
      id: id,
      username: agent
    }
  })
}

export const setErrorMessage = (error,message) => async (dispatch, getState) => {
  dispatch({
    type: SET_ERROR_SUCCESSS,
    payload: {
      error: error,
      message: message
    }
  })
}

export const setAgentBalance = (balance) => async (dispatch, getState) => {
  dispatch({
    type: SET_AGENT_BALANCE_SUCCESSS,
    payload: balance
  })
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
        token: res.data.token
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


export const getPlayersByAgent = (subagent) => async  (dispatch, getState) => {
  try {  
    var id = null;  
    if(subagent){
      id  = getState().agent.id;
    }else{
      id = getState().agent.agent.id;
    }
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/playerbyagent/${id}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: GET_AGENT_PLAYERS_SUCCESS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_PLAYERS_ERROR,
      payload: 'Error geting players by agent'
    })
  }
}

export const getAgentDashboard = () => async  (dispatch, getState) => {
  try {
    const { id } = getState().agent.agent;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/dashboard/${id}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: GET_AGENT_DASHBOARD_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_DASHBOARD_ERROR,
      payload: 'Error geting players by agent'
    })
  }
}

export const getSubsByAgent = () => async  (dispatch, getState) => {
  try {
    const query =  {
      start: 0,
      length: 20,
      search:''
    }
    const { id } = getState().agent.agent;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/subsbyagent/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: GET_AGENT_SUBS_SUCCESS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_SUBS_ERROR,
      payload: 'Error getting sub agents by agent'
    })
  }
}

export const getFiguresByAgent = (weeknumber,byId,subId) => async  (dispatch, getState) => {
  try {
    moment.updateLocale('en', {
      week: {
        dow : 1, // Monday is the first day of the week.
      }
    })
    const query =  {
      start_date: moment().subtract(weeknumber, 'weeks').startOf('week').format('YYYY-MM-DD'),
      end_date: moment().subtract(weeknumber, 'weeks').endOf('week').format('YYYY-MM-DD'),
      is_datefilter:'1'
    }
    var id = null;
    if(byId){
      id = subId;      
    }else{
      id = getState().agent.agent.id;
    }  
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/figuresbyagent/${id}?start_date=${query.start_date}&end_date=${query.end_date}&is_datefilter=${query.is_datefilter}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: GET_AGENT_FIGURES_SUCCESS,
      payload: {
        data: res.data.data,
        totalrake: res.data.totalRack,
        totalperday: res.data.totalperday
      }
    })
  } catch (error) {
    dispatch(signOut());    
  }
}

export const getAgentData = () => async  (dispatch, getState) => {
  try {
    const id = getState().agent.id;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/agent/edit/${id}`,{ headers: { Authorization: AuthStr, agent: agent }});
    let agenttemp = null;

    if(res.data.agent){
      agenttemp = {
        _id: res.data.agent._id,
        username: res.data.agent.username,
        firstname: res.data.agent.firstname,
        lastname: res.data.agent.lastname,
        email: res.data.agent.email,
        commission: res.data.agent.commission,
        status: res.data.agent.status,
        isTransferAllow: res.data.agent.isTransferAllow
      }
    }

    dispatch({
      type: GET_AGENT_INFO_SUCCESS,
      payload: agenttemp
    })
  } catch (error) {
    dispatch({
      type: GET_AGENT_INFO_ERROR,
      payload: 'Error getting agent data'
    })
  }
}

export const editAgentData = (data) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.id;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    console.log(data)
    const res = await axios.post(`${API_AGENT_URL}/agent/edit/${id}`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: UPDATE_AGENT_INFO_SUCCESS,
      payload: {
        agent: res.data.agent,
        message: 'Agent data updated'
      }
    })
  } catch (error) {
    dispatch({
      type: UPDATE_AGENT_INFO_ERROR,
      payload: 'Error updating agent data'
    })
  }
}

export const agentTransfer = (data) => async  (dispatch, getState) => {
  try {
    const id = getState().agent.agent.id;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    data.agentId = id;
    data.isAdmin = 'no';
    const res = await axios.post(`${API_AGENT_URL}/agent/transfer`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: AGENT_TRANSFER_SUCCESS,
      payload: {
        agent:res.data.agent,
        balance: res.data.balance,
        rakebalance: res.data.rakebalance,
        message: res.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_TRANSFER_ERROR,
      payload: 'Error updating agent data'
    })
  }
}

export const agentChangePassword = (data) => async  (dispatch, getState) => {
  try {
    const id = getState().agent.agent.id;    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    data.agentId = id;
    const res = await axios.post(`${API_AGENT_URL}/agent/changepassword`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: AGENT_CHANGE_PASSWORD_SUCCESS,
      payload: {
        agent:res.data.agent,
        message: res.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_CHANGE_PASSWORD_ERROR,
      payload: 'Error updating agent password'
    })
  }
}

export const agentRequestBalance = (data) => async  (dispatch, getState) => {
  try {   
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/agent/requestbalance`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: AGENT_REQUEST_BALANCE_SUCCESS,
      payload: {
        agent:res.data.agent,
        balance: res.data.balance,
        rakebalance: res.data.rakebalance,
        message: res.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_REQUEST_BALANCE_ERROR,
      payload: 'Error updating agent data'
    })
  }
}

export const addAgentData = (data) => async  (dispatch, getState) => {
  try {   
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/agent/addagent`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: ADD_AGENT_INFO_SUCCESS,
      payload: {
        agent:res.data.agent,
        message: 'Agent inserted'
      }
    })
  } catch (error) {
    dispatch({
      type: ADD_AGENT_INFO_ERROR,
      payload: 'Error inserting agent data'
    })
  }
}

export const getFiguresAgentLastThreeWeeks = (byId,subId) => async  (dispatch, getState) => {
  try {
    moment.updateLocale('en', {
      week: {
        dow : 1, // Monday is the first day of the week.
      }
    })
    const query =  {
      start_date: moment().subtract(2, 'weeks').startOf('week').format('YYYY-MM-DD'),
      end_date: moment().subtract(0, 'weeks').endOf('week').format('YYYY-MM-DD'),
      is_datefilter:'1'
    }
    
    var id = null;
    if(byId){
      id = subId;      
    }else{
      id = getState().agent.id;
    }    
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/figuresbyagentlastthree/${id}?start_date=${query.start_date}&end_date=${query.end_date}&is_datefilter=${query.is_datefilter}`,{ headers: { Authorization: AuthStr, agent: agent }});

    dispatch({
      type: LAST_THREE_WEEKS_SUCCESS,
      payload: {
        data: res.data.data,
        totalrake: res.data.totalRack
      }
    })
  } catch (error) {
    dispatch({
      type: LAST_THREE_WEEKS_ERROR,
      payload: 'Error loading figures last three weeks by agent'
    })
  }
}

export const getAgentTransCashHistory = (pstart,plength) => async  (dispatch, getState) => {
  try {
    const query =  {
      start: pstart,
      length: plength,
      search: ''
    }
    const id = getState().agent.id;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/agent/agentchipshistory/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: AGENT_TRANSACTION_HISTORY_SUCCESS,
      payload: {
        data: res.data.data,
        recordsTotal: res.data.recordsTotal,
        recordsFiltered: res.data.recordsFiltered
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_TRANSACTION_HISTORY_ERROR,
      payload: 'Error getting player game history'
    })
  }
}