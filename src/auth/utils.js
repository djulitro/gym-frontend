// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export const isValidToken = (expiredAt) => {
  const currentTime = Date.now() / 1000;

  return Date.now(expiredAt) > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('sessions');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const  setSession = (sessions) => {
  if (sessions) {
    localStorage.setItem('sessions', JSON.stringify(sessions));

    axios.defaults.headers.common.Authorization = `Bearer ${sessions.token}`;

    const exp = Date.now(sessions.expiredAt);
  
    tokenExpired(exp);
  } else {
    localStorage.removeItem('sessions');

    delete axios.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  const session = localStorage.getItem('sessions');

  return JSON.parse(session);
};
