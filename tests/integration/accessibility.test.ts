import { describe, test, expect } from 'bun:test';
import { Toast } from '../../src/toast';
import { createContainer } from '../../src/container';
import { configure } from '../../src/config';

describe('Accessibility', () => {
  test('container should have ARIA live region', () => {
    const container = createContainer('bottom-right');

    expect(container.getAttribute('aria-live')).toBe('polite');
    expect(container.getAttribute('role')).toBe('region');
    expect(container.getAttribute('aria-label')).toBe('Toasts');
  });

  test('container should support assertive aria-live', () => {
    configure({ ariaLive: 'assertive' });
    const container = createContainer('bottom-right');

    expect(container.getAttribute('aria-live')).toBe('assertive');
  });

  test('toasts should have status role', () => {
    new Toast({ type: 'success', heading: 'Success' });

    const toast = document.querySelector('[data-jt-toast]');
    expect(toast?.getAttribute('role')).toBe('status');
  });

  test('toasts should have aria-atomic', () => {
    new Toast({ type: 'info', heading: 'Info' });

    const toast = document.querySelector('[data-jt-toast]');
    expect(toast?.getAttribute('aria-atomic')).toBe('true');
  });

  test('click-to-close toasts should be keyboard accessible', () => {
    new Toast({
      type: 'warning',
      heading: 'Warning',
      clickToClose: true
    });

    const toast = document.querySelector('[data-jt-toast]') as HTMLElement;

    // Should be focusable
    expect(toast.getAttribute('tabindex')).toBe('0');

    // Should have aria-label
    expect(toast.getAttribute('aria-label')).toContain('Press Enter or Space to close');

    // Should have pointer cursor
    expect(toast.style.cursor).toBe('pointer');
  });

  test('regular toasts should not be focusable', () => {
    new Toast({
      type: 'info',
      heading: 'Info',
      clickToClose: false
    });

    const toast = document.querySelector('[data-jt-toast]') as HTMLElement;

    // Should not have tabindex
    expect(toast.getAttribute('tabindex')).toBeNull();
  });

  test('screen reader announcement utility should exist', async () => {
    const { announceToScreenReader } = await import('../../src/utils/announce');

    announceToScreenReader('Test announcement', 'polite');

    const liveRegion = document.querySelector('[data-jt-sr-only]');
    expect(liveRegion).not.toBeNull();
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion?.getAttribute('role')).toBe('status');
  });

  test('screen reader regions should be visually hidden', async () => {
    const { announceToScreenReader } = await import('../../src/utils/announce');

    announceToScreenReader('Hidden announcement', 'polite');

    const liveRegion = document.querySelector('[data-jt-sr-only]') as HTMLElement;

    expect(liveRegion.style.position).toBe('absolute');
    expect(liveRegion.style.left).toBe('-10000px');
    expect(liveRegion.style.width).toBe('1px');
    expect(liveRegion.style.height).toBe('1px');
    expect(liveRegion.style.overflow).toBe('hidden');
  });

  test('should support both polite and assertive announcements', async () => {
    const { announceToScreenReader } = await import('../../src/utils/announce');

    announceToScreenReader('Polite message', 'polite');
    announceToScreenReader('Assertive message', 'assertive');

    const politeRegion = document.querySelector('[data-jt-sr-only][aria-live="polite"]');
    const assertiveRegion = document.querySelector(
      '[data-jt-sr-only][aria-live="assertive"]'
    );

    expect(politeRegion).not.toBeNull();
    expect(assertiveRegion).not.toBeNull();
  });

  test('all toast types should have appropriate attributes', () => {
    const types: Array<
      'success' | 'error' | 'warning' | 'info' | 'debug' | 'spinner' | 'progress'
    > = ['success', 'error', 'warning', 'info', 'debug', 'spinner', 'progress'];

    types.forEach((type) => {
      document.body.innerHTML = ''; // Clear between tests

      new Toast({
        type,
        heading: `${type} notification`,
        progress: type === 'progress' ? { total: 100 } : undefined
      });

      const toast = document.querySelector('[data-jt-toast]');

      expect(toast?.getAttribute('role')).toBe('status');
      expect(toast?.getAttribute('aria-atomic')).toBe('true');
      expect(toast?.hasAttribute(`data-jt-${type}`)).toBe(true);
    });
  });

  test('progress toasts should announce percentage updates', (done) => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Loading',
      progress: { total: 100, showPercentage: true }
    });

    const toast = document.querySelector('[data-jt-toast]');
    toast?.addEventListener('vt:progress', (event: Event) => {
      const customEvent = event as CustomEvent;

      // Progress event should contain accessible information
      expect(customEvent.detail.percentage).toBeDefined();
      expect(customEvent.detail.current).toBeDefined();
      expect(customEvent.detail.total).toBeDefined();

      done();
    });

    notification.setProgress(50);
  });

  test('toasts should have semantic HTML structure', () => {
    new Toast({
      type: 'success',
      heading: 'Success',
      body: 'Operation completed'
    });

    const toast = document.querySelector('[data-jt-toast]');
    const heading = document.querySelector('[data-jt-heading]');
    const body = document.querySelector('[data-jt-body]');

    // All key elements should exist
    expect(toast).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(body).not.toBeNull();

    // Content should be text, not HTML
    expect(heading?.innerHTML).toBe('Success');
    expect(body?.innerHTML).toBe('Operation completed');
  });
});
