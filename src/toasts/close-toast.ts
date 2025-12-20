import type { ToastElements } from './types';

/**
 * Closes a toast after a specified duration by fading it out and then removing it from the DOM.
 * Uses pre-queried elements for better performance.
 *
 * @param elements - The toast elements object
 * @param duration - The duration in milliseconds to wait before starting the close animation
 */
export function closeToast(
  elements: ToastElements,
  duration: number | null
): void {
  let closeTimeout;
  const { toast, progressBar } = elements;

  if (duration > 0) {
    // Animate the progress bar to show time remaining
    progressBar.style.animationName = 'vt-progress-bar';
    progressBar.style.animationDuration = `${duration}ms`;
    progressBar.style.animationTimingFunction = 'linear';
    progressBar.style.animationFillMode = 'forwards';

    // Pause the animation and the closing timeout on hover
    toast.addEventListener('mouseover', () => {
      progressBar.style.animationPlayState = 'paused';
      clearTimeout(closeTimeout);
    });

    // Resume the animation and the closing timeout on exit
    toast.addEventListener('mouseout', () => {
      progressBar.style.animationPlayState = 'running';
      closeTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 250); // 250ms fade-out animation duration
      }, duration);
    });
  }

  // Start the closing timeout
  closeTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250); // 250ms fade-out animation duration
  }, duration);
}
