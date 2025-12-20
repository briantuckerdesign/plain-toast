import type { ToastElements } from './types';

export interface UpdateOptions {
  heading?: string;
  body?: string;
}

/**
 * Updates the content of a toast using pre-queried elements.
 *
 * @param elements - The toast elements object
 * @param userOptions - The options to update (heading and/or body)
 */
export function updateToast(
  elements: ToastElements,
  userOptions: UpdateOptions
): void {
  const { heading, body } = userOptions;

  // Update the heading if provided
  if (heading !== undefined) {
    elements.headingElement.textContent = heading;
  }

  // Update the body if provided
  if (body !== undefined) {
    if (body) {
      elements.bodyElement.textContent = body;
      elements.bodyElement.style.display = 'block';
    } else {
      elements.bodyElement.textContent = '';
      elements.bodyElement.style.display = 'none';
    }
  }
}
