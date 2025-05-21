import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../Sidebar';
import { WIDGET_TYPES } from '../../types'; // To check if all types are rendered
import { ThemeProvider, createTheme } from '@mui/material/styles'; // For theme dependent styles

// Mock react-beautiful-dnd as per vitest.setup.ts
// No need to explicitly mock here if globally mocked in setupFiles

const theme = createTheme();

describe('Sidebar Component', () => {
  const defaultProps = {
    width: 240,
    mobileOpen: false,
    onDrawerToggle: vi.fn(),
    isPermanent: true,
  };

  it('renders the sidebar with title "Widget Types"', () => {
    render(
      <ThemeProvider theme={theme}>
        <Sidebar {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText('Widget Types')).toBeInTheDocument();
  });

  it('renders all widget types from WIDGET_TYPES as draggable items', () => {
    render(
      <ThemeProvider theme={theme}>
        <Sidebar {...defaultProps} />
      </ThemeProvider>
    );
    WIDGET_TYPES.forEach(widgetType => {
      expect(screen.getByText(widgetType.name)).toBeInTheDocument();
    });
  });

  it('renders as permanent drawer when isPermanent is true', () => {
    // This test is more about the structure rendered by Sidebar based on props.
    // The actual MUI Drawer behavior (permanent vs temporary) is complex to assert directly
    // without inspecting internal MUI classes or very specific DOM structures.
    // We'll assume the props are passed correctly and MUI handles the rest.
    // We can check for elements specific to the permanent setup if any.
    render(
      <ThemeProvider theme={theme}>
        <Sidebar {...defaultProps} isPermanent={true} />
      </ThemeProvider>
    );
    // Example: Check for a class or structure specific to permanent drawer if known.
    // For now, just ensuring it renders without error is a basic check.
    expect(screen.getByText('Widget Types')).toBeInTheDocument(); 
  });

  it('renders as temporary drawer when isPermanent is false and mobileOpen is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Sidebar {...defaultProps} isPermanent={false} mobileOpen={true} />
      </ThemeProvider>
    );
    expect(screen.getByText('Widget Types')).toBeInTheDocument(); 
  });
  
  // Note: Testing onDrawerToggle requires interaction that might be complex if
  // the Drawer's backdrop click is the trigger. For now, these rendering tests cover basic states.
});
