import React from 'react';
import { Container, Grid } from '@mui/material';
import Widget from './Widget';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DashboardWidget } from '../types'; 

interface DashboardProps {
  widgets: DashboardWidget[];
  onEditWidget: (widgetId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ widgets, onEditWidget }) => {
  return (
    // Container is removed from here as App.tsx's main Box now handles padding.
    // Alternatively, keep Container if specific maxWidth is desired for dashboard content itself.
    // For this example, assuming App.tsx's padding is sufficient.
    <Droppable droppableId="dashboard-area" direction="horizontal"> 
      {/* `direction="horizontal"` might be misleading for a grid.
          RBDND primarily manages order for 1D lists. For a 2D grid, it tracks index.
          The visual reordering will be constrained by how items flow in the Grid.
          If true 2D reordering is needed, a more complex library or setup is required.
          For now, this allows reordering within the flattened list of widgets.
      */}
      {(provided) => (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }} // Responsive spacing
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{ p: { xs: 1, sm: 2 } }} // Padding for the grid container itself
        >
          {widgets.map((widget, index) => (
            <Draggable key={widget.id} draggableId={widget.id} index={index}>
              {(providedDraggable) => (
                <Grid
                  item
                  // Responsive column sizing
                  xs={12}       // Full width on extra-small screens
                  sm={6}        // Half width on small screens
                  md={6}        // Half width on medium screens
                  lg={4}        // One-third width on large screens
                  xl={3}        // One-fourth width on extra-large screens
                  ref={providedDraggable.innerRef}
                  {...providedDraggable.draggableProps}
                  // dragHandleProps are applied within Widget.tsx
                >
                  <Widget
                    id={widget.id}
                    title={widget.title}
                    provided={providedDraggable}
                    onEdit={onEditWidget}
                  />
                </Grid>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
};

export default Dashboard;
