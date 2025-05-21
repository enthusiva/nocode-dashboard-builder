import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toolbar from '../Toolbar';

describe('Toolbar Component', () => {
  it('renders the toolbar with title and buttons', () => {
    const handleSave = vi.fn();
    const handleLoad = vi.fn();
    const handleMenuClick = vi.fn();

    render(<Toolbar onSave={handleSave} onLoad={handleLoad} onMenuClick={handleMenuClick} />);

    expect(screen.getByText('NoCode Dashboard Builder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load/i })).toBeInTheDocument();
  });

  it('calls onSave when Save button is clicked', () => {
    const handleSave = vi.fn();
    const handleLoad = vi.fn();
    const handleMenuClick = vi.fn();

    render(<Toolbar onSave={handleSave} onLoad={handleLoad} onMenuClick={handleMenuClick} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(handleSave).toHaveBeenCalledTimes(1);
  });

  it('calls onLoad when Load button is clicked', () => {
    const handleSave = vi.fn();
    const handleLoad = vi.fn();
    const handleMenuClick = vi.fn();

    render(<Toolbar onSave={handleSave} onLoad={handleLoad} onMenuClick={handleMenuClick} />);
    fireEvent.click(screen.getByRole('button', { name: /load/i }));
    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  it('calls onMenuClick when Menu button is clicked (visible on small screens)', () => {
    // Note: For this test to be effective, the MenuIcon button needs to be discoverable.
    // Its visibility is controlled by sx prop `display: { md: 'none' }`.
    // Testing Library doesn't directly evaluate MUI's sx props against media queries by default.
    // However, we can check if the button exists and if clicking it calls the handler.
    // To properly test responsive visibility, a more complex setup with theme provider and specific viewport might be needed,
    // or by checking computed styles if JSDOM supports it well enough.
    // For now, we'll ensure the button is present and clickable.
    const handleSave = vi.fn();
    const handleLoad = vi.fn();
    const handleMenuClick = vi.fn();
    
    render(<Toolbar onSave={handleSave} onLoad={handleLoad} onMenuClick={handleMenuClick} />);
    
    const menuButton = screen.getByRole('button', { name: /open drawer/i });
    expect(menuButton).toBeInTheDocument(); // Check if the button is rendered
    fireEvent.click(menuButton);
    expect(handleMenuClick).toHaveBeenCalledTimes(1);
  });
});
