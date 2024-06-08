import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell } from '@mui/material';
//
import ErrorContent from '../ErrorContent';

// ----------------------------------------------------------------------

TableError.propTypes = {
  error: PropTypes.object.isRequired,
  colSpan: PropTypes.number,
};

export default function TableError({ error, colSpan }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <ErrorContent message={error.message} errors={error.errors} />
      </TableCell>
    </TableRow>
  );
}
