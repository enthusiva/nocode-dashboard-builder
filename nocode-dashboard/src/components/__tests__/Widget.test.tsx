import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Widget from '../Widget';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('Widget Component', () => {
  const defaultProps = {
    id: 'widget-1',
    title: 'Test Widget Title',
    onEdit: vi.fn(),
    // `provided` prop from react-beautiful-dnd is optional in props, and mocked globally
  };

  it('renders the widget title and placeholder content', () => {
    render(
      <ThemeProvider theme={theme}>
        <Widget {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    // Check for a snippet of the placeholder content
    expect(screen.getByText(/This is the content area for the "Test Widget Title"/i)).toBeInTheDocument();
  });

  it('calls onEdit with widget id when Edit icon is clicked', () => {
    const handleEdit = vi.fn();
    render(
      <ThemeProvider theme={theme}>
        <Widget {...defaultProps} onEdit={handleEdit} />
      </ThemeProvider>
    );

    const editButton = screen.getByRole('button', { name: /edit widget title/i });
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(defaultProps.id);
  });

  // Test for applying react-beautiful-dnd props (basic check)
  it('applies draggable props if provided', () => {
    const providedProps = {
      innerRef: vi.fn(),
      draggableProps: { 'data-rfd-draggable-id': defaultProps.id } as any, // Cast to any for test simplicity
      dragHandleProps: { 'data-rfd-drag-handle-id': defaultProps.id } as any,
    };
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Widget {...defaultProps} provided={providedProps as any} />
      </ThemeProvider>
    );
    
    // Check if the Paper element (root of Widget) has the draggable prop
    // This assumes Paper is the first child or can be identified. A test-id might be more robust.
    const paperElement = container.firstChild;
    expect(paperElement).toHaveAttribute('data-rfd-draggable-id', defaultProps.id);
    // Drag handle props are also applied to the Paper in the current Widget implementation
    expect(paperElement).toHaveAttribute('data-rfd-drag-handle-id', defaultProps.id);
  });
});
