/**
 * Announces a message to screen readers using a visually-hidden live region.
 * This utility creates or reuses an ARIA live region that is hidden from view
 * but accessible to assistive technologies.
 *
 * @param message - The message to announce to screen readers
 * @param priority - The priority level for the announcement ('polite' or 'assertive')
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  // Check if live region already exists
  let liveRegion = document.querySelector(
    `[data-jt-sr-only][aria-live="${priority}"]`
  ) as HTMLElement | null;

  // Create live region if it doesn't exist
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.setAttribute('data-jt-sr-only', '');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('role', 'status');

    // Visually hide the element while keeping it accessible
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';

    document.body.appendChild(liveRegion);
  }

  // Clear previous message and set new one
  // Using a small timeout ensures screen readers detect the change
  liveRegion.textContent = '';
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, 100);
}
