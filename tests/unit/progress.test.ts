import { describe, test, expect } from 'bun:test';
import { Toast } from '../../src/toast';

describe('Progress Toast', () => {
  test('should create a progress notification', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Uploading...',
      progress: {
        total: 100,
        current: 0
      }
    });

    expect(notification.type).toBe('progress');
    expect(notification.heading).toBe('Uploading...');
  });

  test('should have progress bar element', () => {
    new Toast({
      type: 'progress',
      heading: 'Loading',
      progress: { total: 100 }
    });

    const progressBar = document.querySelector('[data-pt-progress-bar]');
    expect(progressBar).not.toBeNull();
  });

  test('should set progress value', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Processing',
      progress: { total: 100, current: 0 }
    });

    notification.setProgress(50);

    const progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    expect(progressBar.style.width).toBe('50%');
  });

  test('should increment progress', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Loading',
      progress: { total: 100, current: 0 }
    });

    notification.incrementProgress(10);
    let progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    expect(progressBar.style.width).toBe('10%');

    notification.incrementProgress(15);
    progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    expect(progressBar.style.width).toBe('25%');
  });

  test('should show percentage when enabled', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Downloading',
      progress: {
        total: 100,
        current: 0,
        showPercentage: true
      }
    });

    notification.setProgress(75);

    const body = document.querySelector('[data-pt-body]');
    expect(body?.textContent).toBe('75%');
  });

  test('should not exceed 100%', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Loading',
      progress: { total: 100, showPercentage: true }
    });

    notification.setProgress(150);

    const progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    const body = document.querySelector('[data-pt-body]');

    expect(progressBar.style.width).toBe('100%');
    expect(body?.textContent).toBe('100%');
  });

  test('should not go below 0%', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Loading',
      progress: { total: 100, showPercentage: true }
    });

    notification.setProgress(-10);

    const progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    const body = document.querySelector('[data-pt-body]');

    expect(progressBar.style.width).toBe('0%');
    expect(body?.textContent).toBe('0%');
  });

  test('should complete progress', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Uploading',
      progress: { total: 100, current: 50, showPercentage: true }
    });

    notification.complete(0); // No auto-close delay for testing

    const progressBar = document.querySelector('[data-pt-progress-bar]') as HTMLElement;
    const body = document.querySelector('[data-pt-body]');

    expect(progressBar.style.width).toBe('100%');
    expect(body?.textContent).toBe('100%');
  });

  test('should dispatch custom progress event', (done) => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Processing',
      progress: { total: 100 }
    });

    const element = document.querySelector('[data-pt-toast]');
    element?.addEventListener('vt:progress', (event: Event) => {
      const customEvent = event as CustomEvent;
      expect(customEvent.detail.current).toBe(50);
      expect(customEvent.detail.total).toBe(100);
      expect(customEvent.detail.percentage).toBe(50);
      done();
    });

    notification.setProgress(50);
  });

  test('should handle custom total values', () => {
    const notification = new Toast({
      type: 'progress',
      heading: 'Processing files',
      progress: { total: 10, current: 0, showPercentage: true }
    });

    notification.setProgress(5);

    const body = document.querySelector('[data-pt-body]');
    expect(body?.textContent).toBe('50%');
  });
});
