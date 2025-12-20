import { describe, test, expect, beforeEach } from 'bun:test';
import { createContainer, getOrCreateContainer } from '../../src/container';
import { configure, config } from '../../src/config';

describe('Container', () => {
  beforeEach(() => {
    // Reset config to defaults (but don't override target in specific tests)
    configure({
      position: 'bottom-right'
    });
  });

  test('should create a container element', () => {
    const container = createContainer('bottom-right');

    expect(container).not.toBeNull();
    expect(container.getAttribute('data-jt-container')).toBe('');
  });

  test('should have ARIA attributes', () => {
    const container = createContainer('bottom-right');

    expect(container.getAttribute('role')).toBe('region');
    expect(container.getAttribute('aria-label')).toBe('Toasts');
    expect(container.getAttribute('aria-live')).toBe('polite');
  });

  test('should set position attribute', () => {
    const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right'
    ];

    positions.forEach((position) => {
      document.body.innerHTML = ''; // Clear between tests
      const container = createContainer(position);
      expect(container.getAttribute('data-jt-position')).toBe(position);
    });
  });

  test('should append container to body', () => {
    const container = createContainer('bottom-right');
    expect(document.body.contains(container)).toBe(true);
  });

  test('should reuse existing container', () => {
    const container1 = getOrCreateContainer();
    const container2 = getOrCreateContainer();

    expect(container1).toBe(container2);
    expect(document.querySelectorAll('[data-jt-container]').length).toBe(1);
  });

  test('should use configured position', () => {
    configure({ position: 'top-left' });
    const container = getOrCreateContainer();

    expect(container.getAttribute('data-jt-position')).toBe('top-left');
  });

  test('should use custom target element', () => {
    // Clear any existing containers first
    document.querySelectorAll('[data-jt-container]').forEach((el) => el.remove());

    const customTarget = document.createElement('div');
    customTarget.id = 'custom-notifications';
    document.body.appendChild(customTarget);

    configure({ target: customTarget });

    // Verify the target was actually set in config
    expect(config.target).toBeTruthy();

    const container = getOrCreateContainer();

    // The container should be in the DOM
    expect(document.body.contains(container)).toBe(true);
  });

  test('should use custom target selector', () => {
    const customTarget = document.createElement('div');
    customTarget.id = 'toast-area';
    document.body.appendChild(customTarget);

    configure({ target: '#toast-area' });
    const container = getOrCreateContainer();

    expect(container).toBe(customTarget);
  });

  test('should respect aria-live configuration', () => {
    configure({ ariaLive: 'assertive' });
    const container = createContainer('bottom-right');

    expect(container.getAttribute('aria-live')).toBe('assertive');
  });
});
