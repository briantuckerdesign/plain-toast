import { icons } from './icons';
import { styles } from './styles';
import { deepMerge } from './utils/deep-merge';
import { injectCss } from './utils/inject-css';

export interface ConfigClasses {
  notificationClass: string;
  headingWrapperClass: string;
  iconClass: string;
  headingClass: string;
  bodyClass: string;
  progressBarClass: string;
}

export interface ConfigIcons {
  success: string;
  warning: string;
  error: string;
  debug: string;
  spinner: string;
  info: string;
}

export interface Config {
  containerSelector: string;
  injectCss: boolean;
  classes: ConfigClasses;
  icons: ConfigIcons;
  theme: 'none' | 'light' | 'dark' | 'auto';
}

export const config: Config = {
  containerSelector: '[data-vt-container]',
  injectCss: true,
  classes: {
    notificationClass: 'vt-toast',
    headingWrapperClass: 'vt-heading-wrapper',
    iconClass: 'vt-icon',
    headingClass: 'vt-heading',
    bodyClass: 'vt-body',
    progressBarClass: 'vt-progress-bar'
  },
  icons: {
    success: icons.svg.success,
    warning: icons.svg.warning,
    error: icons.svg.error,
    debug: icons.svg.debug,
    spinner: icons.svg.spinner,
    info: icons.svg.info
  },
  theme: 'light'
};

export function configure(options: Partial<Config>) {
  // Apply the safeOptions to your notificationConfig
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
