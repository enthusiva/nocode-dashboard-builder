export interface WidgetType {
  id: string;
  name: string;
}

export const WIDGET_TYPES: WidgetType[] = [
  { id: 'text', name: 'Text Widget' },
  { id: 'chart', name: 'Chart Widget' },
  { id: 'image', name: 'Image Widget' },
];

// Interface for Dashboard Widgets that will be rendered on the dashboard
export interface DashboardWidget {
  id: string; // Unique ID for the instance of the widget
  type: string; // Corresponds to WidgetType.id (e.g., 'text', 'chart')
  title: string; // Display title, can be derived from WidgetType.name initially
}
