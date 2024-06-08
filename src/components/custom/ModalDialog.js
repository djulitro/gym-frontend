import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

ModalDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.element,
};

export default function ModalDialog({ open, onClose, onCancel, title, description, content, ...other }) {
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
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
