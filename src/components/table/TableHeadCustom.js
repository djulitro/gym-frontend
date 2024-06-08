import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

TableHeadCustom.propTypes = {
  onSort: PropTypes.func,
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  rowCount: PropTypes.number,
  numSelected: PropTypes.number,
  onSelectAllRows: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  sx: PropTypes.object,
};

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
}) {
  const renderTableColumns = () =>
    headLabel.map((headCell, index) => {
      if (headCell == null) {
        return <TableCell key={index}>&nbsp;</TableCell>;
      }

      const isSort = headCell.sort === true && rowCount > 0 && onSort;
      const columnOrderBy = headCell.orderBy || headCell.id;

      return (
        <TableCell
          key={index}
          align={headCell.align || 'left'}
          sortDirection={orderBy === columnOrderBy ? order : false}
          sx={{ width: headCell.width, minWidth: headCell.minWidth }}
        >
          {isSort ? (
            <TableSortLabel
              hideSortIcon
              active={orderBy === columnOrderBy}
              direction={orderBy === columnOrderBy ? order : 'asc'}
              onClick={() => onSort(columnOrderBy)}
            >
              {headCell.label}

              {orderBy === columnOrderBy ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          ) : (
            headCell.label
          )}
        </TableCell>
      );
    });

  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAllRows(event.target.checked)}
            />
          </TableCell>
        )}

        {renderTableColumns()}
      </TableRow>
    </TableHead>
  );
}
