import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, useMediaQuery, Theme } from '@mui/material';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EditWidgetModal from './components/EditWidgetModal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { DashboardWidget, WIDGET_TYPES } from './types';
import './App.css';
import MenuIcon from '@mui/icons-material/Menu'; // For mobile toggle

const LOCAL_STORAGE_KEY = 'dashboardLayout';
const SIDEBAR_WIDTH = 240;

const defaultInitialWidgets: DashboardWidget[] = [
  { id: uuidv4(), type: 'text', title: 'Welcome Widget' },
];

function App() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(() => {
    const savedLayout = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        if (Array.isArray(parsedLayout)) return parsedLayout;
      } catch (error) {
        console.error("Error parsing saved layout:", error);
      }
    }
    return defaultInitialWidgets;
  });
  const [editingWidget, setEditingWidget] = useState<DashboardWidget | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false); // For temporary sidebar on mobile

  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSaveDashboard = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(widgets));
      alert('Dashboard saved!');
    } catch (error) {
      console.error("Error saving dashboard:", error);
      alert('Failed to save dashboard.');
    }
  };

  const handleLoadDashboard = () => {
    const savedLayout = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        if (Array.isArray(parsedLayout)) {
          setWidgets(parsedLayout);
          alert('Dashboard loaded!');
        } else {
          alert('Saved data is not in correct format.');
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
        alert('Failed to load dashboard.');
      }
    } else {
      alert('No saved dashboard found.');
    }
  };

  const handleEditWidget = (widgetId: string) => {
    const widgetToEdit = widgets.find(w => w.id === widgetId);
    if (widgetToEdit) setEditingWidget(widgetToEdit);
  };

  const handleSaveTitle = (widgetId: string, newTitle: string) => {
    setWidgets(prev => prev.map(w => (w.id === widgetId ? { ...w, title: newTitle } : w)));
    setEditingWidget(null);
  };

  const handleCancelEdit = () => setEditingWidget(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === 'dashboard-area' && destination.droppableId === 'dashboard-area') {
      const reordered = Array.from(widgets);
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      setWidgets(reordered);
    } else if (source.droppableId === 'sidebar-widgets' && destination.droppableId === 'dashboard-area') {
      const type = WIDGET_TYPES.find(wt => wt.id === draggableId);
      if (!type) return;
      const newWidget: DashboardWidget = { id: uuidv4(), type: type.id, title: type.name };
      const newWidgets = Array.from(widgets);
      newWidgets.splice(destination.index, 0, newWidget);
      setWidgets(newWidgets);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Toolbar 
          onSave={handleSaveDashboard} 
          onLoad={handleLoadDashboard} 
          onMenuClick={handleDrawerToggle} // Pass toggle handler to Toolbar
        />
        <Sidebar
          width={SIDEBAR_WIDTH}
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          isPermanent={isMdUp}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: { xs: 2, sm: 3 }, // Responsive padding
            mt: '64px', // Standard AppBar height
            ml: { md: `${SIDEBAR_WIDTH}px` }, // Offset by sidebar width on medium screens and up
            width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` }, // Ensure correct width calculation
            overflowY: 'auto', // Allow scrolling for dashboard content
          }}
        >
          <Dashboard widgets={widgets} onEditWidget={handleEditWidget} />
        </Box>
      </Box>
      {editingWidget && (
        <EditWidgetModal
          open={!!editingWidget}
          widget={editingWidget}
          onSave={handleSaveTitle}
          onClose={handleCancelEdit}
        />
      )}
    </DragDropContext>
  );
}

export default App;
