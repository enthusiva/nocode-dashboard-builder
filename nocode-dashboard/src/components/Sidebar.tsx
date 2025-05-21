import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Box, Divider, useTheme } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { WIDGET_TYPES } from '../types';

interface SidebarProps {
  width: number;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isPermanent: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ width, mobileOpen, onDrawerToggle, isPermanent }) => {
  const theme = useTheme();

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}> {/* Ensure content scrolls if it overflows vertically */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '64px' /* Align with Toolbar height */ }}>
        <Typography variant="h6" component="div">
          Widget Types
        </Typography>
      </Box>
      <Divider />
      <Droppable droppableId="sidebar-widgets" isDropDisabled={true}>
        {(provided, snapshot) => (
          <List ref={provided.innerRef} {...provided.droppableProps} sx={{ p: 1 }}>
            {WIDGET_TYPES.map((widgetType, index) => (
              <Draggable key={widgetType.id} draggableId={widgetType.id} index={index}>
                {(providedDraggable, snapshotDraggable) => (
                  <ListItem
                    button
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    sx={{
                      userSelect: 'none',
                      mb: 1, // Margin bottom for spacing between items
                      borderRadius: theme.shape.borderRadius, // Rounded corners
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: snapshotDraggable.isDragging ? theme.palette.action.hover : theme.palette.background.paper,
                      boxShadow: snapshotDraggable.isDragging ? theme.shadows[4] : theme.shadows[1],
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText 
                      primary={widgetType.name} 
                      primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
                    />
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: width }, flexShrink: { md: 0 } }}
      aria-label="widget types sidebar"
    >
      {isPermanent ? (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width, position: 'relative', height: '100vh' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
