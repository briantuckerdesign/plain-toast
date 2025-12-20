import { closeToast } from './close-toast';
import { enableClickToClose } from './enable-click-to-close';
import { populateToast } from './populate-toast';
import { getOptions } from './get-options';
import { getOrCreateContainer } from '../container';
import type { ToastType, ToastCreateOptions } from '../types';
import type { ToastElements } from './types';

/**
 * Creates and displays a toast with specified options.
 *
 * @param type - The type of the toast (e.g., 'success', 'error')
 * @param userOptions - The options for the toast
 * @returns The toast elements object with all important elements pre-queried
 */
export function createToast(
  type: ToastType,
  userOptions: ToastCreateOptions
): ToastElements {
  let { heading, body, duration, clickToClose } = getOptions(userOptions);

  if (type === 'spinner') {
    duration = null;
    clickToClose = false;
  }

  // Get or create the toast container
  const container = getOrCreateContainer();

  // Generate a unique ID for the toast
  const toastId = Math.random().toString(36).substring(2, 11);

  // Create the toast and get all elements
  const elements = populateToast(container, type, heading, body, toastId);

  // Close the toast after a specified duration
  if (duration) closeToast(elements, duration);

  // Enable click-to-close functionality
  if (clickToClose) enableClickToClose(elements);

  // Return the toast elements for further manipulation
  return elements;
}
