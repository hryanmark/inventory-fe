import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogPopup(props) {

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent dividers>
            {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onSubmit}>Submit</Button>
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}