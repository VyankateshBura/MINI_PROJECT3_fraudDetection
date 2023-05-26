
import React,{useRef,useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const MessageViewer = ({ open, onClose,setOpenMessage ,msg}) => {
    // Message content
    const message = msg;
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Message</Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <CheckCircleOutlineIcon color="success" style={{ marginRight: '8px' }} />
            <Typography variant="body1">{message}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default MessageViewer;

