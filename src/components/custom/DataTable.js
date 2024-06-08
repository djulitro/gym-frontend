import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Table,
  Switch,
  Tooltip,
  TableBody,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// hooks
import useTable, { emptyRows } from '../../hooks/useTable';
// components
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import {
  TableNoData,
  TableError,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
  TableToolbar,
} from '../table';

// ----------------------------------------------------------------------

DataTable.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  tableId: PropTypes.string,
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
  renderToolbar: PropTypes.func,
  renderRow: PropTypes.func,
  selectedRowsActions: PropTypes.arrayOf(PropTypes.object),
  noDataMessage: PropTypes.string,
  defaultOrderBy: PropTypes.string,
  defaultOrder: PropTypes.string,
  defaultRowsPerPage: PropTypes.number,
};

export default function DataTable(props) {
  const {
    isLoading,
    error,
    tableId,
    tableHead,
    tableData,
    renderToolbar,
    renderRow,
    selectedRowsActions,
    noDataMessage,
    defaultOrderBy,
    defaultOrder,
    defaultRowsPerPage,
  } = props;

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onDenseChange,
    onPageChange,
    onRowsPerPageChange,
  } = useTable({
    defaultOrderBy,
    defaultOrder,
    defaultRowsPerPage,
  });

  const [dataFiltered, setDataFiltered] = useState(tableData);

  const isNotFound = !isLoading && tableData.length > 0 && dataFiltered.length === 0;

  const denseHeight = dense ? 60 : 80;

  const clearSelection = () => {
    setSelected([]);
  };

  const renderTableSelectedActions = () =>
    selectedRowsActions.map((action, index) => (
      <Tooltip key={index} title={action.name}>
        <IconButton color={action.color || 'primary'} onClick={() => action.onClick(selected, clearSelection)}>
          <Iconify icon={action.icon} />
        </IconButton>
      </Tooltip>
    ));

  useEffect(() => {
    setDataFiltered(tableData);
  }, [tableData]);

  return (
    <>
      {renderToolbar ? (
        renderToolbar({
          tableData,
          page,
          order,
          orderBy,
          selected,
          setPage,
          setDataFiltered,
          clearSelection,
        })
      ) : (
        <TableToolbar />
      )}

      <Scrollbar>
        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedActions
              dense={dense}
              numSelected={selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              actions={renderTableSelectedActions()}
            />
          )}

          <Table id={tableId} size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={tableHead}
              rowCount={dataFiltered.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) =>
                  row
                    ? renderRow(row, index, { selected, onSelectRow, clearSelection })
                    : !isNotFound && (
                        <TableSkeleton key={index} colSpan={tableHead?.length} sx={{ height: denseHeight }} />
                      )
                )}

              <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

              {error ? (
                <TableError error={error} colSpan={tableHead?.length} />
              ) : (
                <TableNoData message={noDataMessage} isNotFound={isNotFound} colSpan={tableHead?.length} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={onDenseChange} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </>
  );
}
