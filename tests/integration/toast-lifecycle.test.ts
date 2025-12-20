import { describe, test, expect } from 'bun:test';
import { Toast } from '../../src/toast';

describe('Toast Lifecycle', () => {
  test('should create and display toast', () => {
    const notification = new Toast({
      type: 'success',
      heading: 'Success!'
    });

    const toast = document.querySelector('[data-pt-toast]');
    const container = document.querySelector('[data-pt-container]');

    expect(toast).not.toBeNull();
    expect(container).not.toBeNull();
    expect(container?.contains(toast as Node)).toBe(true);
  });

  test('should close toast programmatically', () => {
    const notification = new Toast({
      type: 'info',
      heading: 'Info'
    });

    expect(document.querySelector('[data-pt-toast]')).not.toBeNull();

    notification.close();

    expect(document.querySelector('[data-pt-toast]')).toBeNull();
  });

  test('should update toast content after creation', () => {
    const notification = new Toast({
      type: 'info',
      heading: 'Processing...'
    });

    let heading = document.querySelector('[data-pt-heading]');
    expect(heading?.textContent).toBe('Processing...');

    notification.update({
      heading: 'Complete!',
      body: 'Task finished successfully'
    });

    heading = document.querySelector('[data-pt-heading]');
    const body = document.querySelector('[data-pt-body]');

    expect(heading?.textContent).toBe('Complete!');
    expect(body?.textContent).toBe('Task finished successfully');
  });

  test('should handle progress workflow', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Uploading file...',
      progress: { total: 100, showPercentage: true }
    });

    // Check initial state
    let progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    expect(progressBar.style.width).toBe('0%');

    // Simulate progress updates
    notification.setProgress(25);
    expect(progressBar.style.width).toBe('25%');

    notification.setProgress(50);
    expect(progressBar.style.width).toBe('50%');

    notification.setProgress(75);
    expect(progressBar.style.width).toBe('75%');

    // Complete the progress
    notification.complete(0);
    expect(progressBar.style.width).toBe('100%');

    const body = document.querySelector('[data-pt-body]');
    expect(body?.textContent).toBe('100%');
  });

  test('should support keyboard interaction when clickToClose is enabled', () => {
    const notification = new Toast({
      type: 'warning',
      heading: 'Warning',
      clickToClose: true
    });

    const toast = document.querySelector('[data-pt-toast]') as HTMLElement;

    // Should be focusable
    expect(toast.getAttribute('tabindex')).toBe('0');

    // Should have keyboard event listener (can't easily test without actual event dispatch)
    expect(toast.style.cursor).toBe('pointer');
  });

  test('should maintain proper DOM structure', () => {
    new Toast({
      type: 'error',
      heading: 'Error',
      body: 'Something went wrong'
    });

    const container = document.querySelector('[data-pt-container]');
    const toast = document.querySelector('[data-pt-toast]');
    const headingWrapper = document.querySelector('[data-pt-heading-wrapper]');
    const icon = document.querySelector('[data-pt-icon]');
    const heading = document.querySelector('[data-pt-heading]');
    const body = document.querySelector('[data-pt-body]');
    const progressBar = document.querySelector('[data-pt-progress-bar]');

    expect(container).not.toBeNull();
    expect(toast).not.toBeNull();
    expect(headingWrapper).not.toBeNull();
    expect(icon).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(body).not.toBeNull();
    expect(progressBar).not.toBeNull();

    // Check hierarchy
    expect(toast?.parentElement).toBe(container);
    expect(headingWrapper?.parentElement).toBe(toast);
    expect(icon?.parentElement).toBe(headingWrapper);
    expect(heading?.parentElement).toBe(headingWrapper);
    expect(body?.parentElement).toBe(toast);
    expect(progressBar?.parentElement).toBe(toast);
  });
});
