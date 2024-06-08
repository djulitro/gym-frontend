// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

export const isValidToken = (expiredAt) => {
  const currentTime = Date.now() / 1000;

  return Date.now(expiredAt) > currentTime;
};

// ----------------------------------------------------------------------

export const  setSession = (sessions) => {
  if (sessions) {
    localStorage.setItem('sessions', JSON.stringify(sessions));

    axios.defaults.headers.common.Authorization = `Bearer ${sessions.token}`;
  } else {
    localStorage.removeItem('sessions');

    delete axios.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  const session = localStorage.getItem('sessions');

  return JSON.parse(session);
};
