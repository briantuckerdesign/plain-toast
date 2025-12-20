import { closeToast } from './close-toast';
import type { ToastElements } from './types';

/**
 * Enables the toast to be closed by clicking on it or pressing Enter/Space.
 * Makes the toast keyboard accessible with proper ARIA attributes.
 *
 * @param elements - The toast elements object
 */
export function enableClickToClose(elements: ToastElements): void {
  const { toast } = elements;

  toast.style.cursor = 'pointer';

  // Make toast focusable and add ARIA label
  toast.setAttribute('tabindex', '0');
  toast.setAttribute('aria-label', 'Toast. Press Enter or Space to close.');

  // Close on click
  toast.addEventListener('click', () => {
    closeToast(elements, 0);
  });

  // Close on keyboard activation (Enter or Space)
  toast.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling on Space
      closeToast(elements, 0);
    }
  });
}
