import { icons } from '../icons';
import { config } from '../config'; // Import the configuration

/**
 * Populates a given container with a notification element.
 *
 * @param {HTMLElement} container - The container to which the notification will be appended.
 * @param {string} type - The type of the notification (e.g., 'success', 'error'), used to determine the icon and styling.
 * @param {string} heading - The heading text of the notification.
 * @param {string} body - The body text of the notification.
 * @param {string} notificationId - A unique identifier for the notification, used for targeting the notification after creation.
 * @returns {HTMLElement} The newly created notification element.
 */
export function populateNotification(container, type, heading, body, notificationId) {
  const {
    notificationClass,
    headingWrapperClass,
    iconClass,
    bodyClass,
    headingClass,
    progressBarClass
  } = config.classes;

  const notificationToInject = `
<div data-vt-toast="${notificationId}" class="${notificationClass} is-${type}" >
  <div data-vt-heading-wrapper class="${headingWrapperClass}">
    <div data-vt-icon class="${iconClass} is-${type}"">${icons.get(type)}</div>
    <div data-vt-heading="true" class="${headingClass}">${heading}</div>
  </div>
  <div data-vt-body class="${bodyClass}">${body}</div>
  <div data-vt-progress-bar class="${progressBarClass}"></div>
</div>`;

  container.insertAdjacentHTML('beforeend', notificationToInject);
  const notification = container.querySelector(`[data-vt-toast="${notificationId}"]`);
  const bodyElement = notification.querySelector('[data-vt-body]');
  if (!body) bodyElement.style.display = 'none';

  return notification;
}
