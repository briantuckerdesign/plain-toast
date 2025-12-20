import { createToast } from './create-toast';
import type { ToastCreateOptions } from '../types';

export const notify = {
  success: (options: ToastCreateOptions) => createToast('success', options),
  error: (options: ToastCreateOptions) => createToast('error', options),
  warning: (options: ToastCreateOptions) => createToast('warning', options),
  debug: (options: ToastCreateOptions) => createToast('debug', options),
  info: (options: ToastCreateOptions) => createToast('info', options),
  spinner: (options: ToastCreateOptions) => createToast('spinner', options),
  progress: (options: ToastCreateOptions) => createToast('progress', options)
};
