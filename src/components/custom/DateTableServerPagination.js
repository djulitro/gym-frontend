import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Table,
  Switch,
  TableBody,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Tooltip,
  IconButton,
} from '@mui/material';
// redux
// hooks
import useTable from '../../hooks/useTable';
// api
// components
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { TableNoData, TableError, TableSkeleton, TableHeadCustom, TableSelectedActions, TableToolbar } from '../table';

// ----------------------------------------------------------------------

DateTableServerPagination.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  tableId: PropTypes.string,
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
  totalData: PropTypes.number,
  renderToolbar: PropTypes.func,
  renderRow: PropTypes.func,
  selectedRowsActions: PropTypes.arrayOf(PropTypes.object),
  noDataMessage: PropTypes.string,
  defaultOrderBy: PropTypes.string,
  defaultOrder: PropTypes.string,
  defaultRowsPerPage: PropTypes.number,
  defaultCurrentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  enableRowsSelection: PropTypes.bool,
  onOrderByChange: PropTypes.func,
};

export default function DateTableServerPagination(props) {
  const {
    isLoading,
    error,
    tableId,
    tableHead,
    tableData,
    totalData,
    renderToolbar,
    renderRow,
    selectedRowsActions,
    noDataMessage,
    defaultOrderBy,
    defaultOrder,
    defaultRowsPerPage,
    defaultCurrentPage,
    onPageChange,
    onRowsPerPageChange,
    enableRowsSelection,
    onOrderByChange,
  } = props;

  const { dense, order, orderBy, selected, setSelected, onSelectRow, onSelectAllRows, onSort, onDenseChange } =
    useTable({
      defaultOrderBy,
      defaultOrder,
      defaultRowsPerPage,
    });

  const [page, setPage] = useState(defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const isNotFound = !isLoading && tableData.length === 0;

  const denseHeight = dense ? 60 : 80;

  useEffect(() => {
    onOrderByChange(orderBy, order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order]);

  const clearSelection = () => {
    setSelected([]);
  };

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
    setPage(newPage);
    clearSelection();
  };

  const handleRowsPerPageChange = (event, rowsPerPage) => {
    setRowsPerPage(rowsPerPage.props.value);
    onRowsPerPageChange(rowsPerPage.props.value);
    setPage(0);
    clearSelection();
  };

  const renderTableSelectedActions = () => {
    selectedRowsActions.map((action, index) => (
      <Tooltip key={index} title={action.name}>
        <IconButton color={action.color || 'primary'} onClick={() => action.onClick(selected, clearSelection)}>
          <Iconify icon={action.icon} />
        </IconButton>
      </Tooltip>
    ));
  };

  return (
    <>
      {renderToolbar ? (
        renderToolbar({
          tableData,
          page,
          order,
          orderBy,
          selected,
          clearSelection,
          enableRowsSelection,
          setPage,
        })
      ) : (
        <TableToolbar />
      )}

      <Scrollbar>
        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
          {enableRowsSelection && selected.length > 0 && (
            <TableSelectedActions
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
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
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={
                enableRowsSelection
                  ? (checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.id)
                      )
                  : false
              }
            />

            <TableBody>
              {(isLoading ? [...Array(rowsPerPage)] : tableData).map((row, index) =>
                row
                  ? renderRow(row, index, { selected, onSelectRow, clearSelection })
                  : !isNotFound && (
                      <TableSkeleton key={index} colSpan={tableHead?.length} sx={{ height: denseHeight }} />
                    )
              )}

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
          count={totalData}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
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
