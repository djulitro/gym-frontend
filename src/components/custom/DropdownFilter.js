import PropTypes from 'prop-types';
// @mui
import { TextField, MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

DropdownFilter.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default function DropdownFilter({ label, items, selectedValue, onChange, ...other }) {
  return (
    <TextField
      fullWidth
      select
      label={label}
      value={selectedValue}
      onChange={onChange}
      SelectProps={{
        MenuProps: {
          sx: { '& .MuiPaper-root': { maxHeight: 260 } },
        },
      }}
      {...other}
    >
      {items.map((item, index) => (
        <MenuItem
          key={index}
          value={item.value}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
          }}
        >
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
