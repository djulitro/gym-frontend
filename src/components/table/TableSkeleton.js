import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

TableSkeleton.propTypes = {
  colSpan: PropTypes.number,
};

export default function TableSkeleton({ colSpan, ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={colSpan}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1, flexShrink: 0 }} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
