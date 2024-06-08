import { useState } from 'react';

// ----------------------------------------------------------------------

export default function useTable(props) {
  const [dense, setDense] = useState(props?.defaultDense || false);

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'id');

  const [order, setOrder] = useState(props?.defaultOrder || 'asc');

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 10);

  const [selected, setSelected] = useState(props?.defaultSelected || []);

  const onSort = (id) => {
    if (id !== '') {
      const isAsc = order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const onSelectRow = (id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const onSelectAllRows = (checked, newSelecteds) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDenseChange = (event) => {
    setDense(event.target.checked);
  };

  // filter

  return {
    dense,
    order,
    page,
    setPage,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onPageChange,
    onDenseChange,
    onRowsPerPageChange,
  };
}

// ----------------------------------------------------------------------

const getNestedObject = (nestedObj, pathArr) =>
  pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), nestedObj);

export function descendingComparator(a, b, orderBy) {
  const aValue = orderBy.includes('.') ? getNestedObject(a, orderBy.split('.')) : a[orderBy];
  const bValue = orderBy.includes('.') ? getNestedObject(b, orderBy.split('.')) : b[orderBy];
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

export function applySortFilter(tableData, comparator) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  const dataFiltered = stabilizedThis.map((el) => el[0]);

  return dataFiltered;
}
