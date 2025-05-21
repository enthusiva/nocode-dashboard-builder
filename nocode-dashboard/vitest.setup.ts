import '@testing-library/jest-dom';

// Basic localStorage mock for all tests
// Individual tests can spyOn or mockImplementation further if needed.
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock for react-beautiful-dnd
// This is a very basic mock. If more complex interactions are needed,
// this might need to be expanded or tests might need to provide their own specific mocks.
vi.mock('react-beautiful-dnd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-beautiful-dnd')>();
  return {
    ...actual,
    DragDropContext: ({ children }: { children: React.ReactNode }) => children,
    Droppable: ({ children }: { children: (provided: any, snapshot: any) => React.ReactElement }) => 
      children({ innerRef: vi.fn(), droppableProps: {} }, {}),
    Draggable: ({ children }: { children: (provided: any, snapshot: any) => React.ReactElement }) => 
      children({ innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
  };
});

// Mock for uuid
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-1234', // Always returns a predictable ID
}));

// Mock for matchMedia, often used by MUI for responsiveness
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
