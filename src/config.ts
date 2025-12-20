import { styles } from './styles';
import { deepMerge } from './utils/deep-merge';
import { injectCss } from './utils/inject-css';
import type { VTConfig, VTIcons } from './types';

export type { VTConfig, VTIcons };

// Lazy-load icons to avoid circular dependency
function getDefaultIcons(): VTIcons {
  const { icons } = require('./icons');
  return {
    success: icons.svg.success,
    warning: icons.svg.warning,
    error: icons.svg.error,
    debug: icons.svg.debug,
    spinner: icons.svg.spinner,
    info: icons.svg.info,
    progress: icons.svg.progress
  };
}

export const config: Required<VTConfig> & { icons: VTIcons } = {
  target: undefined as any, // Will be auto-created if not specified
  position: 'bottom-right',
  injectCss: true,
  theme: 'auto',
  get icons() {
    // Lazy getter to avoid circular dependency
    if (!this._icons) {
      this._icons = getDefaultIcons();
    }
    return this._icons;
  },
  set icons(value: VTIcons) {
    (this as any)._icons = value;
  },
  _icons: undefined as VTIcons | undefined,
  announceToScreenReader: true,
  ariaLive: 'polite'
} as any;

/**
 * Configures global settings for all toast notifications.
 *
 * @param options - Configuration options to merge with defaults
 *
 * @example
 * ```typescript
 * configure({
 *   position: 'top-right',
 *   theme: 'dark',
 *   injectCss: true,
 *   announceToScreenReader: true,
 *   ariaLive: 'polite'
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Use a custom container
 * configure({
 *   target: document.getElementById('toast-container')
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Customize icons
 * configure({
 *   icons: {
 *     success: '<svg>...</svg>',
 *     error: '<svg>...</svg>'
 *   }
 * });
 * ```
 */
export function configure(options: Partial<VTConfig>) {
  // Apply the options to config
  deepMerge(config, options);

  if (!config.injectCss) return;
  // Adds the appropriate styles based on the theme
  switch (config.theme) {
    case 'none':
      break;
    case 'light':
      injectCss(styles.light, styles.base);
      break;
    case 'dark':
      injectCss(styles.dark, styles.base);
      break;
    case 'auto':
      injectCss(styles.auto, styles.base);
      break;
  }
}
