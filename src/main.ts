/**
 * just-toast - Lightweight, accessible toast notifications with zero dependencies
 *
 * @packageDocumentation
 *
 * @example
 * Basic usage:
 * ```typescript
 * import { Toast } from 'just-toast';
 *
 * new Toast({
 *   type: 'success',
 *   heading: 'Success!',
 *   body: 'Operation completed successfully.'
 * });
 * ```
 *
 * @example
 * With configuration:
 * ```typescript
 * import { configure, Toast } from 'just-toast';
 *
 * configure({
 *   position: 'top-right',
 *   theme: 'dark'
 * });
 *
 * new Toast({
 *   type: 'info',
 *   heading: 'Settings Updated'
 * });
 * ```
 *
 * @example
 * Progress tracking:
 * ```typescript
 * const toast = new Toast({
 *   type: 'progress',
 *   heading: 'Uploading...',
 *   progress: { total: 100, showPercentage: true }
 * });
 *
 * toast.setProgress(50);
 * toast.complete();
 * ```
 */

import { configure, config } from './config';
import { Toast } from './toast';

// Export types
export type { VTConfig, VTIcons } from './config';
export type { ToastOptions, ProgressOptions } from './toast';
export type { ToastType, Position, Theme } from './types';

// Export the main API
export { Toast, configure, config };

export default {
  Toast,
  configure,
  config
};
