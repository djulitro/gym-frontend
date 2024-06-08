// routes
import { PATH_DASHBOARD } from './paths';
// components
import SvgColor from '../components/SvgColor';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Usuarios',
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
        children: [
          { title: 'Administradores', path: PATH_DASHBOARD.users.admin },
        ],
      },
    ],
  },
];

export default navConfig;
