/**
 * IIFE entry point for browser script tag usage
 * Exposes justToast as a global variable
 */

import { configure, config } from './config';
import { Toast } from './toast';

// Export to window for IIFE build
declare global {
  interface Window {
    justToast: {
      Toast: typeof Toast;
      configure: typeof configure;
      config: typeof config;
    };
  }
}

window.justToast = {
  Toast,
  configure,
  config
};

export { Toast, configure, config };
