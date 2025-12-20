/**
 * Core type definitions for just-toast
 */

export type ToastType =
  | 'success'
  | 'warning'
  | 'error'
  | 'debug'
  | 'info'
  | 'spinner'
  | 'progress';

export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type Theme = 'light' | 'dark' | 'auto' | 'none';

export type AriaLive = 'polite' | 'assertive';

export interface VTIcons {
  success: string;
  warning: string;
  error: string;
  debug: string;
  spinner: string;
  info: string;
  progress: string;
}

export interface VTConfig {
  // Container options
  target?: HTMLElement | string; // Custom target OR selector, default: auto-create
  position?: Position; // default: 'bottom-right'

  // Styling options
  injectCss?: boolean; // default: true
  theme?: Theme; // default: 'auto'

  // Custom icons (optional overrides)
  icons?: Partial<VTIcons>;

  // Accessibility
  announceToScreenReader?: boolean; // default: true
  ariaLive?: AriaLive; // default: 'polite'
}

export interface ProgressOptions {
  total: number; // Total steps (e.g., 100)
  current?: number; // Current step (default: 0)
  showPercentage?: boolean; // Show "45%" text (default: true)
}

export interface ToastOptions {
  type: ToastType;
  heading: string;
  body?: string;
  duration?: number | null;
  clickToClose?: boolean;
  progress?: ProgressOptions;
}

export interface ToastCreateOptions {
  heading: string;
  body?: string;
  duration?: number | null;
  clickToClose?: boolean;
}
