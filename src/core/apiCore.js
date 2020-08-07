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