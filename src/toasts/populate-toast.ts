import { icons } from '../icons';
import type { ToastType } from '../types';
import type { ToastElements } from './types';

/**
 * Creates a toast element using DOM APIs and returns an object with all important elements pre-queried.
 *
 * @param container - The container to which the toast will be appended
 * @param type - The type of the toast (e.g., 'success', 'error')
 * @param heading - The heading text of the toast
 * @param body - The body text of the toast
 * @param toastId - A unique identifier for the toast
 * @returns An object containing all the important toast elements
 */
export function populateToast(
  container: HTMLElement,
  type: ToastType,
  heading: string,
  body: string,
  toastId: string
): ToastElements {
  // Create main toast element
  const toast = document.createElement('div');
  toast.setAttribute('data-jt-toast', toastId);
  toast.setAttribute(`data-jt-${type}`, '');

  // Add ARIA attributes for accessibility
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-atomic', 'true');

  // Create heading wrapper
  const headingWrapper = document.createElement('div');
  headingWrapper.setAttribute('data-jt-heading-wrapper', '');

  // Create icon element
  const iconElement = document.createElement('div');
  iconElement.setAttribute('data-jt-icon', '');
  iconElement.setAttribute(`data-jt-${type}`, '');
  iconElement.innerHTML = icons.get(type);

  // Create heading element
  const headingElement = document.createElement('div');
  headingElement.setAttribute('data-jt-heading', 'true');
  headingElement.textContent = heading;

  // Append icon and heading to wrapper
  headingWrapper.appendChild(iconElement);
  headingWrapper.appendChild(headingElement);

  // Create body element
  const bodyElement = document.createElement('div');
  bodyElement.setAttribute('data-jt-body', '');
  bodyElement.textContent = body;
  if (!body) {
    bodyElement.style.display = 'none';
  }

  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.setAttribute('data-jt-progress-bar', '');

  // Append all elements to toast
  toast.appendChild(headingWrapper);
  toast.appendChild(bodyElement);
  toast.appendChild(progressBar);

  // Append toast to container
  container.appendChild(toast);

  // Return an object with all important elements pre-queried
  return {
    toast,
    container,
    headingWrapper,
    iconElement,
    headingElement,
    bodyElement,
    progressBar
  };
}
