import React from 'react';
import { AppBar, Toolbar as MuiToolbar, Button, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface ToolbarProps {
  onSave: () => void;
  onLoad: () => void;
  onMenuClick: () => void; // For toggling sidebar on mobile
}

const Toolbar: React.FC<ToolbarProps> = ({ onSave, onLoad, onMenuClick }) => {
  return (
    <AppBar 
      position="fixed" // Changed from static to fixed
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} // Ensure Toolbar is above Sidebar
    >
      <MuiToolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }} // Only display on screens smaller than md
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NoCode Dashboard Builder
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}> {/* Hide buttons on very small screens if needed, or adjust layout */}
          <Button color="inherit" onClick={onSave}>
            Save
          </Button>
          <Button color="inherit" onClick={onLoad}>
            Load
          </Button>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;
