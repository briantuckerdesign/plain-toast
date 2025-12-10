/**
 * The Notification class is designed to create and manage custom notification elements.
 * It supports different types of notifications such as success, error, warning, and debug,
 * each with customizable properties like heading, body, duration, and click-to-close functionality.
 *
 * - `element`: Holds the HTML element of the notification, initially null.
 * - `type`: Specifies the type of notification (e.g., success, error).
 * - `heading`: The text displayed as the heading of the notification.
 * - `body`: The main content or body of the notification.
 * - `duration`: How long the notification will be displayed before automatically closing.
 * - `clickToClose`: Allows the notification to be closed on click if set to true.
 *
 * The constructor takes an object with these properties, with `duration` and `clickToClose` falling back to default values if not provided.
 * It then creates the notification element based on the specified type and properties.
 *
 * The `remove` method allows for the manual removal of the notification's element from the DOM.
 */
import { notify } from './notifications';
import { defaultOptions } from './notifications/default-options';
import { updateNotification } from './notifications/update-notification';

export interface NotificationOptions {
  type: 'success' | 'warning' | 'error' | 'debug' | 'info' | 'spinner';
  heading: string;
  body?: string;
  duration?: number;
  clickToClose?: boolean;
}

export class Notification {
  private element: HTMLElement | null = null;

  type: 'success' | 'warning' | 'error' | 'debug' | 'info' | 'spinner';
  heading: string;
  body: string;
  duration: number;
  clickToClose: boolean;

  constructor({
    type,
    heading,
    body = '',
    duration = defaultOptions.duration,
    clickToClose = defaultOptions.clickToClose
  }: NotificationOptions) {
    this.type = type;
    this.heading = heading;
    this.body = body;
    this.duration = duration;
    this.clickToClose = clickToClose;

    this.element = notify[this.type]({
      heading: this.heading,
      body: this.body,
      duration: this.duration,
      clickToClose: this.clickToClose
    });
  }

  update(options: { heading?: string; body?: string }) {
    if (!this.element) return;
    updateNotification(this.element, options);
  }

  close() {
    if (!this.element) return;
    this.element.remove();
    this.element = null;
  }
}
