// @mui
import { Tooltip, IconButton, Stack } from '@mui/material';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function TableToolbar() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ py: 2.5, px: 3 }}>
      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon={'ic:round-filter-list'} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
