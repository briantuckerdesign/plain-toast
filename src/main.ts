import { configure, config } from './config';
import { Notification } from './notification';

export type { Config, ConfigClasses, ConfigIcons } from './config';
export type { NotificationOptions } from './notification';

export default {
  Notification,
  configure,
  config
};
