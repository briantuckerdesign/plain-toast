import { describe, test, expect } from 'bun:test';
import { Toast } from '../../src/toast';

describe('Toast', () => {
  test('should create a success notification', () => {
    const notification = new Toast({
      type: 'success',
      heading: 'Success!',
      body: 'Operation completed'
    });

    expect(notification.type).toBe('success');
    expect(notification.heading).toBe('Success!');
    expect(notification.body).toBe('Operation completed');
  });

  test('should create notifications of all types', () => {
    const types: Array<
      'success' | 'error' | 'warning' | 'info' | 'debug' | 'spinner' | 'progress'
    > = ['success', 'error', 'warning', 'info', 'debug', 'spinner', 'progress'];

    types.forEach((type) => {
      const notification = new Toast({
        type,
        heading: `${type} notification`,
        progress: type === 'progress' ? { total: 100 } : undefined
      });

      expect(notification.type).toBe(type);
      expect(notification.heading).toBe(`${type} notification`);
    });
  });

  test('should create notification element in DOM', () => {
    const notification = new Toast({
      type: 'info',
      heading: 'Information'
    });

    const element = document.querySelector('[data-jt-toast]');
    expect(element).not.toBeNull();
    expect(element?.getAttribute('data-jt-info')).toBe('');
  });

  test('should have ARIA attributes', () => {
    new Toast({
      type: 'success',
      heading: 'Success'
    });

    const element = document.querySelector('[data-jt-toast]');
    expect(element?.getAttribute('role')).toBe('status');
    expect(element?.getAttribute('aria-atomic')).toBe('true');
  });

  test('should have heading and body elements', () => {
    new Toast({
      type: 'error',
      heading: 'Error occurred',
      body: 'Something went wrong'
    });

    const heading = document.querySelector('[data-jt-heading]');
    const body = document.querySelector('[data-jt-body]');

    expect(heading?.textContent).toBe('Error occurred');
    expect(body?.textContent).toBe('Something went wrong');
  });

  test('should hide body when empty', () => {
    new Toast({
      type: 'warning',
      heading: 'Warning'
    });

    const body = document.querySelector('[data-jt-body]') as HTMLElement;
    expect(body.style.display).toBe('none');
  });

  test('should support custom duration', () => {
    const notification = new Toast({
      type: 'info',
      heading: 'Info',
      duration: 5000
    });

    expect(notification.duration).toBe(5000);
  });

  test('should support click to close', () => {
    const notification = new Toast({
      type: 'success',
      heading: 'Success',
      clickToClose: true
    });

    expect(notification.clickToClose).toBe(true);

    const element = document.querySelector('[data-jt-toast]') as HTMLElement;
    expect(element.getAttribute('tabindex')).toBe('0');
    expect(element.style.cursor).toBe('pointer');
  });

  test('should update notification content', () => {
    const notification = new Toast({
      type: 'info',
      heading: 'Loading...'
    });

    notification.update({
      heading: 'Complete!',
      body: 'All done'
    });

    const heading = document.querySelector('[data-jt-heading]');
    const body = document.querySelector('[data-jt-body]');

    expect(heading?.textContent).toBe('Complete!');
    expect(body?.textContent).toBe('All done');
  });

  test('should close notification', () => {
    const notification = new Toast({
      type: 'info',
      heading: 'Info'
    });

    expect(document.querySelector('[data-jt-toast]')).not.toBeNull();

    notification.close();

    expect(document.querySelector('[data-jt-toast]')).toBeNull();
  });
});
