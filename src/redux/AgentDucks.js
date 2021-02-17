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
  menustate: false,
  responseDeposit: null,
  responseWithdraw: null,
  responseConfirm: null,
  playersWithdraws: null,
  playersDeposits: null,
  agentWithdraws: null,
  agentDeposits: null,
  datadeposit: null,
  datawithdraw: null,
  totalrackwithdraw: null,
  totalrackdeposit: null,
  totalperdaywithdraw: null,
  totalperdaydeposit: null,
  messages: null,
  sentmessages: null,
  agentsmessages: null,
  recordsTotalSent: 0,
  recordsFilteredSent: 0,
  unreadmessages: 0,  
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
const REQUEST_ADDRESS_SUCCESS = 'REQUEST_ADDRESS_SUCCESS'
const REQUEST_ADDRESS_ERROR = 'REQUEST_ADDRESS_ERROR'
const CONFIRM_TXID_SUCCESS = 'CONFIRM_TXID_SUCCESS'
const CONFIRM_TXID_ERROR = 'CONFIRM_TXID_ERROR'
const REQUEST_PAYOUT_SUCCESS = 'REQUEST_PAYOUT_SUCCESS'
const REQUEST_PAYOUT_ERROR = 'REQUEST_PAYOUT_ERROR' 
const REQUEST_AGENT_BALANCE_SUCCESS = 'REQUEST_AGENT_BALANCE_SUCCESS'
const AGENT_PLAYERS_WITHDRAWS_SUCCESS = 'AGENT_PLAYERS_WITHDRAWS_SUCCESS'
const AGENT_PLAYERS_WITHDRAWS_ERROR = 'AGENT_PLAYERS_WITHDRAWS_ERROR'
const AGENT_PLAYERS_DEPOSITS_SUCCESS = 'AGENT_PLAYERS_DEPOSITS_SUCCESS'
const AGENT_PLAYERS_DEPOSITS_ERROR = 'AGENT_PLAYERS_DEPOSITS_ERROR'
const SET_WITHDRAW_DEPOSIT_NULL = 'SET_WITHDRAW_DEPOSIT_NULL'
const GET_AGENT_FIGURES_CASHIER_SUCCESS = 'GET_AGENT_FIGURES_CASHIER_SUCCESS'
const SET_AGENT_DATA_NULL = 'SET_AGENT_DATA_NULL'
const AGENT_MESSAGES = 'AGENT_MESSAGES'
const AGENT_MESSAGES_ERROR = 'AGENT_MESSAGES_ERROR'
const SEND_AGENT_MESSAGE_ERROR = 'SEND_AGENT_MESSAGE_ERROR'
const SEND_AGENT_MESSAGE = 'SEND_AGENT_MESSAGE'
const GET_AGENTS_MESSAGES = 'GET_AGENTS_MESSAGES'
const GET_AGENTS_MESSAGES_ERROR = 'GET_AGENTS_MESSAGES_ERROR'
const DELETE_AGENT_MESSAGE = 'DELETE_AGENT_MESSAGE'
const DELETE_AGENT_MESSAGE_ERROR = 'DELETE_AGENT_MESSAGE_ERROR'
const AGENT_MESSAGES_SENT = 'AGENT_MESSAGES_SENT'
const AGENT_MESSAGES_SENT_ERROR = 'AGENT_MESSAGES_SENT_ERROR'
const SET_UNREAD_MESSAGES_SUCCESSS = 'SET_UNREAD_MESSAGES_SUCCESSS'

//Reducer
//Establece el seteo de los estados de acuerdo a la accion enviada
export default function agentReducer(state = agentData, action){
  switch(action.type){
    case AGENT_LOGIN_SUCCESS:
      console.log('action.payload.unread', action.payload.unread);
      return{...state, agentsession: action.payload.agent, agent: action.payload.agent, unreadmessages: action.payload.unread, rakebalance: action.payload.agent.rake_chips, balance: action.payload.agent.chips, isAuthenticated: true, token: action.payload.token, error: null, id: null, username: null, data: null, players: null, subagents: null, figures: null, totalrake: 0, totalperday: null, lastThreeWeeks: null, messageupdate: null, transactions: null, dashboard: null, menustate: false, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_LOGOUT_SUCCESS:      
      return{...state, agentsession: null, agent: null, balance: 0, rakebalance: 0,isAuthenticated: false, token: null, error: null, id: null, username: null, data: null, players: null, subagents: null, figures: null, totalrake: 0, totalperday: null, lastThreeWeeks: null, messageupdate: null, transactions: null, dashboard: null, menustate: false, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case SET_MENU_STATE_SUCCESSS:
      return{...state, menustate: action.payload, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_PLAYERS_SUCCESS:
      return{...state, players: action.payload, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_DASHBOARD_SUCCESS:
      return{...state, dashboard: action.payload, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_DASHBOARD_ERROR:
      return{...state, error: action.payload}
    case GET_AGENT_SUBS_SUCCESS:
      return{...state, subagents: action.payload, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_FIGURES_SUCCESS:
      return{...state, figures: action.payload.data, totalrake:action.payload.totalrake, totalperday: action.payload.totalperday, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
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
      return{...state, id: action.payload.id, username: action.payload.username, data: null, error: null, figures: null, lastThreeWeeks: null, messageupdate: null, transactions: null, responseConfirm: null}
    case SET_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_INFO_SUCCESS:
      return{...state, data: action.payload, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case UPDATE_AGENT_INFO_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case UPDATE_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case ADD_AGENT_INFO_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case ADD_AGENT_INFO_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case LAST_THREE_WEEKS_SUCCESS:
      return{...state, lastThreeWeeks: action.payload.data, totalrake:action.payload.totalrake, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case LAST_THREE_WEEKS_ERROR:
      return{...state, error: action.payload}
    case AGENT_TRANSACTION_HISTORY_SUCCESS:
      return{...state, transactions: action.payload.data, recordsTotal: action.payload.recordsTotal, recordsFiltered: action.payload.recordsFiltered, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_TRANSACTION_HISTORY_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case SET_AGENT_BALANCE_SUCCESSS:
      return{...state, balance: action.payload}   
    case AGENT_TRANSFER_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, rakebalance: action.payload.rakebalance, balance: action.payload.balance, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_TRANSFER_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_REQUEST_BALANCE_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, rakebalance: action.payload.rakebalance, balance: action.payload.balance, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_REQUEST_BALANCE_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}   
    case SET_ERROR_SUCCESSS:
      return{...state, error: action.payload.error, messageupdate: action.payload.message, responseDeposit: null, responseWithdraw: null, responseConfirm: null}  
    case AGENT_CHANGE_PASSWORD_SUCCESS:
      return{...state, messageupdate: action.payload.message, data: action.payload.agent, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_CHANGE_PASSWORD_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case REQUEST_ADDRESS_SUCCESS:
      return{...state, messageupdate: action.payload.message, responseDeposit: action.payload.responseDeposit, error: null, responseConfirm: null, responseWithdraw: null}   
    case REQUEST_ADDRESS_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null} 
    case CONFIRM_TXID_SUCCESS:
      return{...state, messageupdate: action.payload.message, responseConfirm: action.payload.responseDeposit, responseDeposit: null, responseWithdraw: null, error: null}   
    case CONFIRM_TXID_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case REQUEST_PAYOUT_SUCCESS:
      return{...state, messageupdate: action.payload.message, responseWithdraw: action.payload.responseWithdraw, responseDeposit: null, responseConfirm: null, error: null}   
    case REQUEST_PAYOUT_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null}
    case REQUEST_AGENT_BALANCE_SUCCESS:
      return{...state, balance: action.payload.balance, rakebalance: action.payload.rakebalance, error: null} 
    case AGENT_PLAYERS_WITHDRAWS_SUCCESS:
      return{...state, playersWithdraws: action.payload.data, recordsTotal: action.payload.recordsTotal, recordsFiltered: action.payload.recordsFiltered, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_PLAYERS_WITHDRAWS_ERROR:
      return{...state, error: action.payload, playersWithdraws: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_PLAYERS_DEPOSITS_SUCCESS:
      return{...state, playersDeposits: action.payload.data, recordsTotal: action.payload.recordsTotal, recordsFiltered: action.payload.recordsFiltered, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case AGENT_PLAYERS_DEPOSITS_ERROR:
      return{...state, error: action.payload, playersDeposits: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENT_FIGURES_CASHIER_SUCCESS:
      return{...state, datawithdraw: action.payload.datawithdraw, datadeposit: action.payload.datadeposit, totalrackwithdraw:action.payload.totalrackwithdraw, totalrackdeposit:action.payload.totalrackdeposit, totalperdaywithdraw: action.payload.totalperdaywithdraw, totalperdaydeposit: action.payload.totalperdaydeposit, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case SET_WITHDRAW_DEPOSIT_NULL:
      return{...state, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case SET_AGENT_DATA_NULL:
      return{...state, error: null, id: null, username: null, data: null}

    case AGENT_MESSAGES:
      return{...state, error: null, messages: action.payload.data, recordsTotal: action.payload.recordsTotal, recordsFiltered: action.payload.recordsFiltered}
    case AGENT_MESSAGES_ERROR:
      return{...state, error: action.payload, messages: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}

    case SEND_AGENT_MESSAGE:
      return{...state, messageupdate: action.payload.message, sentmessages: action.payload.messages, error: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case SEND_AGENT_MESSAGE_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}

    case GET_AGENTS_MESSAGES:
      return{...state, agentsmessages: action.payload, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case GET_AGENTS_MESSAGES_ERROR:
      return{...state, error: action.payload}

      case DELETE_AGENT_MESSAGE:
        return{...state, messages: action.payload.messages, recordsTotal: action.payload.recordsTotal, recordsFiltered: action.payload.recordsFiltered, error: null, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
      case DELETE_AGENT_MESSAGE_ERROR:
        return{...state, error: action.payload}

    case AGENT_MESSAGES_SENT:
      return{...state, error: null, sentmessages: action.payload.data, recordsTotalSent: action.payload.recordsTotal, recordsFilteredSent: action.payload.recordsFiltered}
    case AGENT_MESSAGES_SENT_ERROR:
      return{...state, error: action.payload, messageupdate: null, responseDeposit: null, responseWithdraw: null, responseConfirm: null}
    case SET_UNREAD_MESSAGES_SUCCESSS:
      return{...state, unreadmessages: action.payload}

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

export const setUnreadMessages = (total) => async (dispatch, getState) => {
  dispatch({
    type: SET_UNREAD_MESSAGES_SUCCESSS,
    payload: total
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

export const setWithdrawDepositNull = () => async (dispatch, getState) => {
  dispatch({
    type: SET_WITHDRAW_DEPOSIT_NULL,
    payload: null
  })
}

export const setAgentDataNull = () => async (dispatch, getState) => {
  dispatch({
    type: SET_AGENT_DATA_NULL,
    payload: null
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
        token: res.data.token,
        unread: res.data.unreadmessages,
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

export const getAgentsForMessages = () => async  (dispatch, getState) => {
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
    const res = await axios.get(`${API_AGENT_URL}/agentsformessages/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: GET_AGENTS_MESSAGES,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_AGENTS_MESSAGES_ERROR,
      payload: 'Error getting agents for messages'
    })
  }
}

export const getAgentMessages = (pstart,plength) => async  (dispatch, getState) => {
  try {
    const query =  {
      start: pstart,
      length:plength,
      search: ''
    }
    const id = getState().agent.agentsession.id;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/agent/messages/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});

    dispatch({
      type: AGENT_MESSAGES,
      payload: {
        data: res.data.data,
        recordsTotal: res.data.recordsTotal,
        recordsFiltered: res.data.recordsFiltered
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_MESSAGES_ERROR,
      payload: 'Error getting agent messages'
    })
  }
}

export const getAgentSentMessages = (pstart,plength) => async  (dispatch, getState) => {
  try {
    const query =  {
      start: pstart,
      length:plength,
      search: ''
    }
    const id = getState().agent.agentsession.id;
    const agent = JSON.stringify(getState().agent.agent);
    const token = getState().agent.agent.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/agent/sentmessages/${id}?start=${query.start}&length=${query.length}&search=${query.search}`,{ headers: { Authorization: AuthStr, agent: agent }});

    dispatch({
      type: AGENT_MESSAGES_SENT,
      payload: {
        data: res.data.data,
        recordsTotal: res.data.recordsTotal,
        recordsFiltered: res.data.recordsFiltered
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_MESSAGES_SENT_ERROR,
      payload: 'Error getting agent sent messages'
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
      start_date: moment().subtract(weeknumber, 'weeks').startOf('week').subtract(6,'hour').format('YYYY-MM-DDTHH:mm:ssZ'),
      end_date: moment().subtract(weeknumber, 'weeks').endOf('week').subtract(6,'hour').format('YYYY-MM-DDTHH:mm:ssZ'),
      is_datefilter:'1'
    }  
    var id = null;
    if(byId){
      id = subId;      
    }else{      
      id = getState().agent.agentsession.id;
    }   
    const agent = JSON.stringify(getState().agent.agentsession);
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

export const getDepositsWithdrawsByAgent = (weeknumber,byId,subId) => async  (dispatch, getState) => {
  try {
    moment.updateLocale('en', {
      week: {
        dow : 1, // Monday is the first day of the week.
      }
    })
    const query =  {
      start_date: moment().subtract(weeknumber, 'weeks').startOf('week').subtract(6,'hour').format('YYYY-MM-DDTHH:mm:ssZ'),
      end_date: moment().subtract(weeknumber, 'weeks').endOf('week').subtract(6,'hour').format('YYYY-MM-DDTHH:mm:ssZ'),
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
    const res = await axios.get(`${API_AGENT_URL}/depwithbyagent/${id}?start_date=${query.start_date}&end_date=${query.end_date}&is_datefilter=${query.is_datefilter}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: GET_AGENT_FIGURES_CASHIER_SUCCESS,
      payload: {
        datawithdraw: res.data.datawithdraw,
        totalrackwithdraw: res.data.totalrackwithdraw,
        totalperdaywithdraw: res.data.totalperdaywithdraw,
        datadeposit: res.data.datadeposit,
        totalrackdeposit: res.data.totalrackdeposit,
        totalperdaydeposit: res.data.totalperdaydeposit
      }
    })
  } catch (error) {
    console.log('ERROR ON REQUEST WITHDRAWS, DEPOSIT RESPORT', error);
    //dispatch(signOut());    
  }
}

export const getAgentData = () => async  (dispatch, getState) => {
  try {
    const id = getState().agent.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
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
        isTransferAllow: res.data.agent.isTransferAllow,
        allowDeposits: res.data.agent.allowDeposits,
        allowWithdrawals: res.data.agent.allowWithdrawals,
        allowTranferPlayer: res.data.agent.allowTranferPlayer,
        allowTransferAgent: res.data.agent.allowTransferAgent,
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

export const getAgentBalances = () => async  (dispatch, getState) => {
  try {
    if(getState().agent.agentsession){
      const id = getState().agent.agentsession.id;
      const agent = JSON.stringify(getState().agent.agentsession);
      const token = getState().agent.agentsession.jwt_token;
      const AuthStr = 'Bearer '.concat(token);
      const res = await axios.get(`${API_AGENT_URL}/agent/balances/${id}`,{ headers: { Authorization: AuthStr, agent: agent }});
      let agenttemp = null;
      if(res.data.agent){
        agenttemp = {
          balance: res.data.agent.balance,
          rakebalance: res.data.agent.rakebalance
        }
      }else{
        agenttemp = {
          balance: 0,
          rakebalance: 0
        }
      }
      dispatch({
        type: REQUEST_AGENT_BALANCE_SUCCESS,
        payload: agenttemp
      })
    }    
  } catch (error) {
    console.log('ERROR LOADING BALANCES', error);
  }
}

export const editAgentData = (data) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/agent/edit/${id}`, data, { headers: { Authorization: AuthStr, agent: agent }});
    if(res.data.error){
      dispatch({
        type: UPDATE_AGENT_INFO_ERROR,
        payload: res.data.error,
      })
    }else{
      dispatch({
        type: UPDATE_AGENT_INFO_SUCCESS,
        payload: {
          agent: res.data.agent,
          message: 'Agent data updated'
        }
      })
    }    
  } catch (error) {
    dispatch({
      type: UPDATE_AGENT_INFO_ERROR,
      payload: 'Error updating agent data'
    })
  }
}

export const deleteAgentMessage = (message) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.agentsession.id;
    message.agentId = id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/deletemessage`, message, { headers: { Authorization: AuthStr, agent: agent }});
    if(res.data.error){
      dispatch({
        type: DELETE_AGENT_MESSAGE_ERROR,
        payload: res.data.error,
      })
    }else{
      dispatch({
        type: DELETE_AGENT_MESSAGE,
        payload: {
          messages: res.data.messages,
          recordsTotal: res.data.recordsTotal,
          recordsFiltered: res.data.recordsFiltered,
          message: 'Message deleted successfully.'
        }
      })
    }    
  } catch (error) {
    dispatch({
      type: DELETE_AGENT_MESSAGE_ERROR,
      payload: 'Error deleting message'
    })
  }
}

export const sendAgentMessage = (data) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.agentsession.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/agent/sendmessage/${id}`, data, { headers: { Authorization: AuthStr, agent: agent }});
    if(res.data.error){
      dispatch({
        type: SEND_AGENT_MESSAGE_ERROR,
        payload: res.data.error,
      })
    }else{
      dispatch({
        type: SEND_AGENT_MESSAGE,
        payload: {
          sentmessages: res.data.messages,
          message: 'Message sent.'
        }
      })
    }    
  } catch (error) {
    dispatch({
      type: SEND_AGENT_MESSAGE_ERROR,
      payload: 'Error updating agent data'
    })
  }
}

export const requestDeposit = (data) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.agentsession.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    data.agentId = id;
    console.log(data)    
    const res = await axios.post(`${API_AGENT_URL}/agent/requestdeposit`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: REQUEST_ADDRESS_SUCCESS,
      payload: {
        responseDeposit: res.data,
        message: 'Request address successfully'
      }
    })
  } catch (error) {
    dispatch({
      type: REQUEST_ADDRESS_ERROR,
      payload: 'Error on request address'
    })
  }
}

export const confirmTxidHash = (txid) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    let data = {
      agentId: id,
      txid_hash: txid
    }

    console.log(data)    
    const res = await axios.post(`${API_AGENT_URL}/agent/confirmtxidhash`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: CONFIRM_TXID_SUCCESS,
      payload: {
        responseDeposit: res.data,
        message: 'Transaction confirmed successfully'
      }
    })
  } catch (error) {
    dispatch({
      type: CONFIRM_TXID_ERROR,
      payload: 'Error on confirmation'
    })
  }
}

export const requestPayout = (data) => async  (dispatch, getState) => {
  try {    
    const id = getState().agent.agentsession.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    data.agentId = id;
    console.log(data)    
    const res = await axios.post(`${API_AGENT_URL}/agent/requestpayout`, data, { headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: REQUEST_PAYOUT_SUCCESS,
      payload: {
        responseWithdraw: res.data,
        message: 'Request payout successfully'
      }
    })
  } catch (error) {
    dispatch({
      type: REQUEST_PAYOUT_ERROR,
      payload: 'Error on request payout'
    })
  }
}

export const agentTransfer = (data) => async  (dispatch, getState) => {
  try {
    const id = getState().agent.agent.id;    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
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
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
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
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    console.log('agentRequestBalance', data);
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
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.post(`${API_AGENT_URL}/agent/addagent`, data, { headers: { Authorization: AuthStr, agent: agent }});
    if(res.data.error){
      dispatch({
        type: ADD_AGENT_INFO_ERROR,
        payload: res.data.error,
      })
    }else{
      dispatch({
        type: ADD_AGENT_INFO_SUCCESS,
        payload: {
          agent:res.data.agent,
          message: 'Agent inserted'
        }
      })
    }    
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
      start_date: moment().subtract(2, 'weeks').startOf('week').subtract(6,'hour').format('YYYY-MM-DDTHH:mm:ssZ'),
      end_date: moment().subtract(0, 'weeks').endOf('week').subtract(6,'hour').format('YYYY-MM-DDTHH:mm:ssZ'),
      is_datefilter:'1'
    }
    
    var id = null;
    if(byId){
      id = subId;      
    }else{
      id = getState().agent.agentsession.id;
    }    
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
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
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
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

export const getAgentPlayersWithdraws = (pstart, plength, pstartdate) => async  (dispatch, getState) => {
  try {
    const query =  {
      start: pstart,
      length: plength,
      search: '',
      startdate: pstartdate
    }
    
    const id = getState().agent.agentsession.id;
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/agent/playerswithdraws/${id}?start=${query.start}&length=${query.length}&search=${query.search}&startdate=${query.startdate}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: AGENT_PLAYERS_WITHDRAWS_SUCCESS,
      payload: {
        data: res.data.data,
        recordsTotal: res.data.recordsTotal,
        recordsFiltered: res.data.recordsFiltered
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_PLAYERS_WITHDRAWS_ERROR,
      payload: 'Error getting player withdraws'
    })
  }
}

export const getAgentPlayersDeposits = (pstart, plength, pstartdate) => async  (dispatch, getState) => {
  try {
    const query =  {
      start: pstart,
      length: plength,
      search: '',
      startdate: pstartdate
    }
    const id = getState().agent.agentsession.id;
    const agent = JSON.stringify(getState().agent.agentsession);
    const token = getState().agent.agentsession.jwt_token;
    const AuthStr = 'Bearer '.concat(token);
    const res = await axios.get(`${API_AGENT_URL}/agent/playersdeposits/${id}?start=${query.start}&length=${query.length}&search=${query.search}&startdate=${query.startdate}`,{ headers: { Authorization: AuthStr, agent: agent }});
    dispatch({
      type: AGENT_PLAYERS_DEPOSITS_SUCCESS,
      payload: {
        data: res.data.data,
        recordsTotal: res.data.recordsTotal,
        recordsFiltered: res.data.recordsFiltered
      }
    })
  } catch (error) {
    dispatch({
      type: AGENT_PLAYERS_DEPOSITS_ERROR,
      payload: 'Error getting player deposits'
    })
  }
}