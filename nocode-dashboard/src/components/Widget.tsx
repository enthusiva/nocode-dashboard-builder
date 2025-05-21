import React from 'react';
import { Paper, Typography, Box, IconButton, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DraggableProvided } from 'react-beautiful-dnd';

interface WidgetProps {
  id: string;
  title: string;
  provided?: DraggableProvided;
  onEdit: (widgetId: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ id, title, provided, onEdit }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={2} // Slightly reduced elevation for a cleaner look
      sx={{
        p: 2,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Ensure Paper fills the Grid item height
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['box-shadow', 'border-color']),
        '&:hover': {
          boxShadow: theme.shadows[4],
        }
      }}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      // Spread dragHandleProps here if the whole widget is the handle
      // If a specific part of the widget should be the handle, apply it there
      {...provided?.dragHandleProps} 
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1.5, // Margin bottom for separation from content
        }}
        // If only the header should be draggable, move dragHandleProps here:
        // {...provided?.dragHandleProps} 
      >
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontWeight: 'medium', 
            flexGrow: 1, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onEdit(id)}
          aria-label="edit widget title"
          sx={{ ml: 1 }} // Margin left to ensure spacing from title
        >
          <EditIcon fontSize="inherit" /> {/* Inherit size for better control */}
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, typography: 'body2', color: 'text.secondary' }}>
        {/* Placeholder for widget content - could be more dynamic later */}
        This is the content area for the "{title}". It can be customized further.
      </Box>
    </Paper>
  );
};

export default Widget;
