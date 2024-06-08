import { useEffect, useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();

  const [nameComplete, setNameComplete] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user.admin) {
      setNameComplete(`${user.admin.name} ${user.admin.last_name}`);
      setRole('Administrador');
    } else {
      setNameComplete(`${user.client.name} ${user.client.last_name}`);
      setRole('');
    }
  }, [user]);

  return (
    <StyledRoot>
      <CustomAvatar src={user?.photoURL} alt={nameComplete} name={nameComplete} />

      <Box sx={{ ml: 2, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {nameComplete}
        </Typography>

        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
          {role}
        </Typography>
      </Box>
    </StyledRoot>
  );
}
