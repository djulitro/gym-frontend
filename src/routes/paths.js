// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  users: {
    root: path(ROOTS_DASHBOARD, '/user'),
    admin: path(ROOTS_DASHBOARD, '/user/admin'),
  }
};
