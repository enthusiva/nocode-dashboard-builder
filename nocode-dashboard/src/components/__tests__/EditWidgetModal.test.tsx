import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EditWidgetModal from '../EditWidgetModal';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('EditWidgetModal Component', () => {
  const mockWidget = { id: 'w1', title: 'Initial Title' };
  const handleSave = vi.fn();
  const handleClose = vi.fn();

  it('does not render when open is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={false} widget={null} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders correctly when open is true with widget data', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={true} widget={mockWidget} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit Widget Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Widget Title')).toHaveValue(mockWidget.title);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('updates input field value on change', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={true} widget={mockWidget} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    const input = screen.getByLabelText('Widget Title') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Title' } });
    expect(input.value).toBe('New Title');
  });

  it('calls onSave with widget id and new title when Save button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={true} widget={mockWidget} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    const newTitle = 'Updated Title';
    fireEvent.change(screen.getByLabelText('Widget Title'), { target: { value: newTitle } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith(mockWidget.id, newTitle);
  });

  it('does not call onSave if title is empty or whitespace only', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={true} widget={mockWidget} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    fireEvent.change(screen.getByLabelText('Widget Title'), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    // The current implementation of handleSave in EditWidgetModal trims the title
    // and checks if it's not empty. So, this should not call onSave.
    expect(handleSave).not.toHaveBeenCalled(); 
  });


  it('calls onClose when Cancel button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={true} widget={mockWidget} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when dialog is closed via backdrop click (simulated)', () => {
    // MUI Dialog's onClose is triggered by various events including backdrop click or Escape key.
    // We are testing the onClose prop passed to the Dialog component.
    render(
      <ThemeProvider theme={theme}>
        <EditWidgetModal open={true} widget={mockWidget} onSave={handleSave} onClose={handleClose} />
      </ThemeProvider>
    );
    
    // Simulate the Dialog's own onClose mechanism calling our handler
    // This is typically done by finding the Dialog's root and simulating a backdrop click,
    // but testing-library doesn't make this easy. We assume MUI's Dialog works.
    // We can test that our handleClose (passed to Dialog's onClose) is called.
    // If we fire an event that MUI Dialog listens to for closing:
    // For example, pressing the Escape key on the dialog.
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
