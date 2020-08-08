import { API_AGENT_URL } from '../config';

export const signin = user => {
  console.log(API_AGENT_URL);
  return fetch (`${API_AGENT_URL}/loginagent`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then( response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
}

export const getPlayersByAgent = async (agent) => {
  return await fetch(`${API_AGENT_URL}/playerbyagent/${agent.id}`, {
    method: 'GET'
  })
    .then(response => {      
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
}

export const getSubsByAgent = async (agent) => {
  return await fetch(`${API_AGENT_URL}/subsbyagent/${agent.id}`, {
    method: 'GET'
  })
    .then(response => {      
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
}

export const authenticate = (data) => {
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt', JSON.stringify(data));
    console.log('SE INSERTO EL TOKEN');
    return true;
  } 
  return false;
}

export const isAuthenticate = () => {
  if(typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
    //return localStorage.getItem('jwt');
  }
    return false;
}

export const getPlayerGameHistory = async (player) => {
  const query =  {
    start: 1591052309,
    length:40,
    search: ''
  }
  console.log(`${API_AGENT_URL}/player/gameHistory/${player}`)
  return await fetch(`${API_AGENT_URL}/player/gameHistory/${player}?start=0&length=0&search=''`, {
    method: 'GET'
  })
    .then(response => {      
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
}