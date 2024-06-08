import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

ActionsButton.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default function ActionsButton({ label, items, onSelectItem, ...other }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const anchorRef = useRef(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    onSelectItem(items[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        id={other.id}
        variant="contained"
        color="generic"
        ref={anchorRef}
        aria-label="split button"
        sx={{
          width: '100%',
        }}
      >
        <Button fullWidth startIcon={<Iconify icon={'eva:list-outline'} />} onClick={handleToggle}>
          {label}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <Iconify icon={'mdi:arrow-drop-down'} width={24} height={24} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1300,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              sx={{
                boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {items.map((item, index) => (
                    <MenuItem
                      key={index}
                      disabled={item.disabled}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
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
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
