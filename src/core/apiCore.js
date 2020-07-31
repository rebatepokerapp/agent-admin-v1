import { API_AGENT_URL } from '../config';

export const signin = user => {
  console.log(API_AGENT_URL);
  return fetch (`http://localhost:4025/`, {
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

export const authenticate = (data, next) => {
  /* if(typeof window !== 'undefined'){
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  } */
  next();
}

export const isAuthenticated = () => {
  /*if(typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
    //return localStorage.getItem('jwt');
  }
    return false;*/
  return true;
}