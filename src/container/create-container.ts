import { config } from '../config';
import type { Position } from '../types';

/**
 * Creates and returns a toast container element with the specified position.
 * The container is automatically appended to the document body.
 *
 * @param position - The position where the container should appear on the screen
 * @returns The created container HTMLElement
 */
export function createContainer(position: Position = 'bottom-right'): HTMLElement {
  const container = document.createElement('div');
  container.setAttribute('data-pt-container', '');
  container.setAttribute('data-pt-position', position);
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Toasts');

  if (config.ariaLive) {
    container.setAttribute('aria-live', config.ariaLive);
  }

  document.body.appendChild(container);
  return container;
}

/**
 * Gets an existing container or creates a new one based on config.
 * If config.target is specified, uses that; otherwise creates a new container.
 *
 * @returns The container HTMLElement
 */
export function getOrCreateContainer(): HTMLElement {
  // If a target is specified in config, use that
  if (config.target) {
    if (typeof config.target === 'string') {
      const existing = document.querySelector(config.target) as HTMLElement;
      if (existing) return existing;
    } else if (config.target instanceof HTMLElement) {
      return config.target;
    }
  }

  // Check if a container already exists
  const existing = document.querySelector('[data-pt-container]') as HTMLElement;
  if (existing) return existing;

  // Create a new container with the configured position
  return createContainer(config.position);
}
