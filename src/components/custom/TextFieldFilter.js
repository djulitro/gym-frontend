import PropTypes from 'prop-types';
// @mui
import { TextField, InputAdornment } from '@mui/material';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

TextFieldFilter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default function TextFieldFilter({ label, value, onChange, ...other }) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      placeholder="Buscar"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
}
