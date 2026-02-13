/**
 * The Toast class is designed to create and manage custom notification elements.
 * It supports different types of notifications such as success, error, warning, and debug,
 * each with customizable properties like heading, body, duration, and click-to-close functionality.
 *
 * - `elements`: Holds references to all important toast elements for efficient manipulation.
 * - `type`: Specifies the type of notification (e.g., success, error).
 * - `heading`: The text displayed as the heading of the notification.
 * - `body`: The main content or body of the notification.
 * - `duration`: How long the notification will be displayed before automatically closing.
 * - `clickToClose`: Allows the notification to be closed on click if set to true.
 *
 * The constructor takes an object with these properties, with `duration` and `clickToClose` falling back to default values if not provided.
 * It then creates the notification element based on the specified type and properties.
 *
 * The `close` method allows for the manual removal of the notification's element from the DOM.
 */
import { notify } from './toasts';
import { defaultOptions } from './toasts/default-options';
import { updateToast } from './toasts/update-toast';
import type { ToastOptions, ProgressOptions, ToastType } from './types';
import type { ToastElements } from './toasts/types';

export type { ToastOptions, ProgressOptions };

export class Toast {
  private elements: ToastElements | null = null;
  private progressOptions?: ProgressOptions;

  type: ToastType;
  heading: string;
  body: string;
  duration: number;
  clickToClose: boolean;

  constructor({
    type,
    heading,
    body = '',
    duration = defaultOptions.duration,
    clickToClose = defaultOptions.clickToClose,
    progress
  }: ToastOptions) {
    this.type = type;
    this.heading = heading;
    this.body = body;
    this.duration = duration;
    this.clickToClose = clickToClose;

    // Handle progress type
    if (type === 'progress') {
      this.progressOptions = {
        total: progress?.total || 100,
        current: progress?.current || 0,
        showPercentage: progress?.showPercentage !== false
      };
      // Progress toasts don't auto-close by default
      if (duration === defaultOptions.duration) {
        this.duration = null;
      }
    }

    this.elements = notify[this.type]({
      heading: this.heading,
      body: this.body,
      duration: this.duration,
      clickToClose: this.clickToClose
    });

    // Initialize progress bar if this is a progress type
    if (type === 'progress' && this.progressOptions) {
      this.setProgress(this.progressOptions.current);
    }
  }

  update(options: { heading?: string; body?: string }): void {
    if (!this.elements) return;
    updateToast(this.elements, options);
  }

  /**
   * Updates the progress bar to the specified value
   * @param current - The current progress value (0 to total)
   * @param progressOptions - Update the options for the progress bar
   */
  setProgress(current: number, progressOptions?: ProgressOptions): void {
    if (!this.elements || this.type !== 'progress' || !this.progressOptions) return;

    if (progressOptions)
      this.progressOptions = { ...this.progressOptions, ...progressOptions };

    const { progressBar, bodyElement, toast } = this.elements;

    // Calculate percentage
    const percentage = Math.min(
      100,
      Math.max(0, (current / this.progressOptions.total) * 100)
    );

    // Update progress bar width
    progressBar.style.width = `${percentage}%`;
    progressBar.style.transition = 'width 0.3s ease';

    // Update body with percentage if showPercentage is true
    if (this.progressOptions.showPercentage) {
      bodyElement.textContent = `${Math.round(percentage)}%`;
      bodyElement.style.display = 'block';
    }

    // Update current value
    this.progressOptions.current = current;

    // Dispatch custom event
    toast.dispatchEvent(
      new CustomEvent('vt:progress', {
        detail: { current, total: this.progressOptions.total, percentage }
      })
    );
  }

  /**
   * Increments the progress by the specified amount
   * @param amount - The amount to increment by (default: 1)
   */
  incrementProgress(amount: number = 1): void {
    if (!this.progressOptions) return;
    this.setProgress((this.progressOptions.current || 0) + amount);
  }

  /**
   * Completes the progress (sets to 100%) and optionally auto-closes after a delay
   * @param autoCloseDelay - Delay in ms before auto-closing (default: 2000ms)
   */
  complete(autoCloseDelay: number = 2000): void {
    if (!this.progressOptions) return;

    this.setProgress(this.progressOptions.total);

    // Auto-close after delay
    if (autoCloseDelay > 0) {
      setTimeout(() => {
        this.close();
      }, autoCloseDelay);
    }
  }

  close() {
    if (!this.elements) return;
    this.elements.toast.remove();
    this.elements = null;
  }
}
