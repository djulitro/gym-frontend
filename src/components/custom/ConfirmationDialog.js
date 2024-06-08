import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.element,
  confirmButtonColor: PropTypes.string,
  confirmButtonAutofocus: PropTypes.bool,
};

export default function ConfirmationDialog({
  open,
  onClose,
  onCancel,
  onConfirm,
  title,
  description,
  content,
  confirmButtonColor,
  confirmButtonAutofocus,
  ...other
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...other}
    >
      {title && (
        <DialogTitle id="alert-dialog-title" sx={{ mb: 2 }}>
          {title}
        </DialogTitle>
      )}
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
      )}
      {content && <DialogContent dividers>{content}</DialogContent>}
      <DialogActions>
        <Button color="inherit" onClick={onCancel} sx={{ px: 2 }}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color={confirmButtonColor || 'primary'}
          onClick={onConfirm}
          sx={{ px: 2 }}
          autoFocus={confirmButtonAutofocus}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
