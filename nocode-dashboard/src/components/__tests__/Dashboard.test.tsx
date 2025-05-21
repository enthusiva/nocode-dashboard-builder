import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../Dashboard';
import { DashboardWidget } from '../../types';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock react-beautiful-dnd as per vitest.setup.ts
// Mock Widget component to simplify Dashboard testing and focus on its own logic
vi.mock('../Widget', () => ({
  default: ({ title, onEdit, id }: { title: string, onEdit: (id: string) => void, id: string }) => (
    <div data-testid={`widget-${id}`} onClick={() => onEdit(id)}>
      Mocked Widget: {title}
    </div>
  ),
}));

const theme = createTheme();

describe('Dashboard Component', () => {
  const mockWidgets: DashboardWidget[] = [
    { id: 'w1', type: 'text', title: 'Widget One' },
    { id: 'w2', type: 'chart', title: 'Widget Two' },
  ];

  const handleEditWidget = vi.fn();

  it('renders a list of widgets provided via props', () => {
    render(
      <ThemeProvider theme={theme}>
        <Dashboard widgets={mockWidgets} onEditWidget={handleEditWidget} />
      </ThemeProvider>
    );

    expect(screen.getByText('Mocked Widget: Widget One')).toBeInTheDocument();
    expect(screen.getByTestId('widget-w1')).toBeInTheDocument();

    expect(screen.getByText('Mocked Widget: Widget Two')).toBeInTheDocument();
    expect(screen.getByTestId('widget-w2')).toBeInTheDocument();
  });

  it('passes onEditWidget prop to each rendered (mocked) Widget', () => {
    render(
      <ThemeProvider theme={theme}>
        <Dashboard widgets={mockWidgets} onEditWidget={handleEditWidget} />
      </ThemeProvider>
    );
    
    // Simulate click on the first mocked widget
    // The mocked Widget calls onEdit with its id upon click
    screen.getByTestId('widget-w1').click();
    expect(handleEditWidget).toHaveBeenCalledWith('w1');

    screen.getByTestId('widget-w2').click();
    expect(handleEditWidget).toHaveBeenCalledWith('w2');
    
    expect(handleEditWidget).toHaveBeenCalledTimes(2);
  });

  it('renders no widgets if an empty array is passed', () => {
    render(
      <ThemeProvider theme={theme}>
        <Dashboard widgets={[]} onEditWidget={handleEditWidget} />
      </ThemeProvider>
    );
    // Check that no elements with the widget mock structure are present
    expect(screen.queryByText(/Mocked Widget:/i)).not.toBeInTheDocument();
  });
});
