import { Notification } from '../Notification';

/**
 * Closes a notification element after a specified duration by fading it out and then removing it from the DOM.
 *
 * @param {HTMLElement} notification - The notification element to close.
 * @param {number} duration - The duration in milliseconds to wait before starting the close animation.
 */
export function closeNotification(notification, duration) {
  let closeTimeout;

  if (duration > 0) {
    const progressElement = notification.querySelector(
      '[data-vt-progress-bar]'
    );
    if (progressElement) {
      progressElement.style.animationName = 'vt-progress-bar';
      progressElement.style.animationDuration = `${duration}ms`;
      progressElement.style.animationTimingFunction = 'linear';
      progressElement.style.animationFillMode = 'forwards'; // Keeps the state at the end of the animation
    }

    // Pause the animation and the closing timeout on hover
    notification.addEventListener('mouseover', () => {
      if (progressElement) {
        progressElement.style.animationPlayState = 'paused';
      }
      clearTimeout(closeTimeout);
    });

    // Resume the animation and the closing timeout on exit
    notification.addEventListener('mouseout', () => {
      if (progressElement) {
        progressElement.style.animationPlayState = 'running';
      }
      closeTimeout = setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 250); // Assumes a 250ms fade-out animation duration
      }, duration);
    });
  }

  // Start the closing timeout
  closeTimeout = setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 250); // Assumes a 250ms fade-out animation duration
  }, duration);
}

// export function closeNotification(notification, duration) {
//   if (duration > 0) {
//     const progressElement = notification.querySelector(
//       '[data-vt-progress-bar]'
//     );
//     if (progressElement) {
//       progressElement.style.animationName = 'vt-progress-bar';
//       progressElement.style.animationDuration = `${duration}ms`;
//       progressElement.style.animationTimingFunction = 'linear';
//       progressElement.style.animationFillMode = 'forwards'; // Keeps the state at the end of the animation
//     }
//   }
//   setTimeout(() => {
//     notification.style.opacity = '0';
//     setTimeout(() => {
//       if (notification.parentNode)
//         notification.parentNode.removeChild(notification);
//     }, 250); // Assumes a 250ms fade-out animation duration
//   }, duration);
// }
