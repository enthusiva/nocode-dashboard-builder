import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

interface EditWidgetModalProps {
  open: boolean;
  widget: { id: string; title: string } | null;
  onSave: (widgetId: string, newTitle: string) => void;
  onClose: () => void;
}

const EditWidgetModal: React.FC<EditWidgetModalProps> = ({
  open,
  widget,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (widget) {
      setTitle(widget.title);
    } else {
      setTitle(''); // Reset title if no widget is being edited (e.g., modal closes)
    }
  }, [widget]);

  const handleSave = () => {
    if (widget && title.trim() !== '') {
      onSave(widget.id, title.trim());
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Widget Title</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Widget Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => { // Optional: allow save on Enter key
            if (e.key === 'Enter') {
              handleSave();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWidgetModal;
