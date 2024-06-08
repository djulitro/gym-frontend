import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../EmptyContent';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  message: PropTypes.string,
  isNotFound: PropTypes.bool,
  colSpan: PropTypes.number,
};

export default function TableNoData({ message, isNotFound, colSpan }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={colSpan}>
          <EmptyContent
            title={message}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={colSpan} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
