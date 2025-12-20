/**
 * Represents all the important elements within a toast
 * Pre-queried for performance and ease of manipulation
 */
export interface ToastElements {
  /** The main toast container element */
  toast: HTMLElement;
  /** The parent container that holds all toasts */
  container: HTMLElement;
  /** Wrapper element containing the icon and heading */
  headingWrapper: HTMLElement;
  /** The icon element for the toast type */
  iconElement: HTMLElement;
  /** The heading text element */
  headingElement: HTMLElement;
  /** The body/message text element */
  bodyElement: HTMLElement;
  /** The progress bar element (used for auto-close animation and progress type) */
  progressBar: HTMLElement;
}
