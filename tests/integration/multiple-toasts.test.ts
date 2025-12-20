import { describe, test, expect } from 'bun:test';
import { Toast } from '../../src/toast';

describe('Multiple Toasts', () => {
  test('should create multiple toasts in the same container', () => {
    new Toast({ type: 'success', heading: 'Success 1' });
    new Toast({ type: 'info', heading: 'Info 1' });
    new Toast({ type: 'warning', heading: 'Warning 1' });

    const toasts = document.querySelectorAll('[data-pt-toast]');
    const containers = document.querySelectorAll('[data-pt-container]');

    expect(toasts.length).toBe(3);
    expect(containers.length).toBe(1); // Should reuse same container
  });

  test('should maintain all toasts in DOM', () => {
    const notification1 = new Toast({ type: 'success', heading: 'First' });
    const notification2 = new Toast({ type: 'error', heading: 'Second' });
    const notification3 = new Toast({ type: 'info', heading: 'Third' });

    const toasts = document.querySelectorAll('[data-pt-toast]');
    expect(toasts.length).toBe(3);

    const headings = document.querySelectorAll('[data-pt-heading]');
    const headingTexts = Array.from(headings).map((h) => h.textContent);

    expect(headingTexts).toContain('First');
    expect(headingTexts).toContain('Second');
    expect(headingTexts).toContain('Third');
  });

  test('should close specific toast without affecting others', () => {
    const notification1 = new Toast({ type: 'success', heading: 'First' });
    const notification2 = new Toast({ type: 'error', heading: 'Second' });
    const notification3 = new Toast({ type: 'info', heading: 'Third' });

    expect(document.querySelectorAll('[data-pt-toast]').length).toBe(3);

    notification2.close();

    expect(document.querySelectorAll('[data-pt-toast]').length).toBe(2);

    const headings = document.querySelectorAll('[data-pt-heading]');
    const headingTexts = Array.from(headings).map((h) => h.textContent);

    expect(headingTexts).toContain('First');
    expect(headingTexts).not.toContain('Second');
    expect(headingTexts).toContain('Third');
  });

  test('should handle different toast types simultaneously', () => {
    const types: Array<'success' | 'error' | 'warning' | 'info' | 'debug' | 'spinner'> = [
      'success',
      'error',
      'warning',
      'info',
      'debug',
      'spinner'
    ];

    types.forEach((type) => {
      new Toast({ type, heading: `${type} toast` });
    });

    types.forEach((type) => {
      const toast = document.querySelector(`[data-pt-${type}]`);
      expect(toast).not.toBeNull();
    });

    expect(document.querySelectorAll('[data-pt-toast]').length).toBe(types.length);
  });

  test('should handle multiple progress toasts', () => {
    const upload = new Toast({
      type: 'progress',
      heading: 'Upload',
      progress: { total: 100, showPercentage: true }
    });

    const download = new Toast({
      type: 'progress',
      heading: 'Download',
      progress: { total: 100, showPercentage: true }
    });

    upload.setProgress(50);
    download.setProgress(75);

    const progressBars = document.querySelectorAll(
      '[data-pt-progress-bar]'
    ) as NodeListOf<HTMLElement>;
    expect(progressBars.length).toBe(2);

    // Note: Can't easily test which progress bar belongs to which toast in this test
    // but we can verify both exist and have different widths
    const widths = Array.from(progressBars).map((bar) => bar.style.width);
    expect(widths).toContain('50%');
    expect(widths).toContain('75%');
  });

  test('should close all toasts independently', () => {
    const toasts = [
      new Toast({ type: 'success', heading: '1' }),
      new Toast({ type: 'info', heading: '2' }),
      new Toast({ type: 'warning', heading: '3' }),
      new Toast({ type: 'error', heading: '4' })
    ];

    expect(document.querySelectorAll('[data-pt-toast]').length).toBe(4);

    toasts.forEach((toast) => toast.close());

    expect(document.querySelectorAll('[data-pt-toast]').length).toBe(0);
  });

  test('should update multiple toasts independently', () => {
    const toast1 = new Toast({ type: 'info', heading: 'Original 1' });
    const toast2 = new Toast({ type: 'info', heading: 'Original 2' });

    toast1.update({ heading: 'Updated 1' });

    const headings = document.querySelectorAll('[data-pt-heading]');
    const texts = Array.from(headings).map((h) => h.textContent);

    expect(texts).toContain('Updated 1');
    expect(texts).toContain('Original 2');
    expect(texts).not.toContain('Original 1');
  });
});
