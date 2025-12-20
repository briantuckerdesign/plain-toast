import { describe, test, expect, beforeEach } from 'bun:test';
import { configure, config } from '../../src/config';

describe('Configuration', () => {
  beforeEach(() => {
    // Reset config to defaults before each test
    configure({
      position: 'bottom-right',
      injectCss: true,
      theme: 'auto',
      announceToScreenReader: true,
      ariaLive: 'polite'
    });
  });

  test('should have default configuration', () => {
    expect(config.position).toBe('bottom-right');
    expect(config.injectCss).toBe(true);
    expect(config.theme).toBe('auto');
    expect(config.announceToScreenReader).toBe(true);
    expect(config.ariaLive).toBe('polite');
  });

  test('should merge custom configuration', () => {
    configure({
      position: 'top-left',
      theme: 'dark'
    });

    expect(config.position).toBe('top-left');
    expect(config.theme).toBe('dark');
    // Other properties should remain unchanged
    expect(config.injectCss).toBe(true);
    expect(config.announceToScreenReader).toBe(true);
  });

  test('should allow disabling CSS injection', () => {
    configure({ injectCss: false });
    expect(config.injectCss).toBe(false);
  });

  test('should allow changing ARIA live region priority', () => {
    configure({ ariaLive: 'assertive' });
    expect(config.ariaLive).toBe('assertive');
  });

  test('should support all position values', () => {
    const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right'
    ];

    positions.forEach(position => {
      configure({ position });
      expect(config.position).toBe(position);
    });
  });

  test('should support all theme values', () => {
    const themes: Array<'light' | 'dark' | 'auto' | 'none'> = [
      'light',
      'dark',
      'auto',
      'none'
    ];

    themes.forEach(theme => {
      configure({ theme });
      expect(config.theme).toBe(theme);
    });
  });

  test('should have default icons', () => {
    expect(config.icons.success).toBeDefined();
    expect(config.icons.error).toBeDefined();
    expect(config.icons.warning).toBeDefined();
    expect(config.icons.info).toBeDefined();
    expect(config.icons.debug).toBeDefined();
    expect(config.icons.spinner).toBeDefined();
    expect(config.icons.progress).toBeDefined();
  });
});
