import { defaultOptions } from './default-options';

/**
 * Merges user-defined options with default toast options and ensures a heading is provided.
 *
 * This function takes an object of user-defined options, merges them with the default options,
 * and validates that a heading is present, as it is required for the toast to be successful.
 * If the heading is missing, an error is thrown. The function then returns an object containing
 * the merged and validated options.
 *
 * @param {object} userOptions - The user-defined options for the toast.
 * @returns {object} An object containing the merged and validated toast options.
 * @throws {Error} If the heading is not provided in the options.
 */
export function getOptions(userOptions: any) {
  let options = { ...defaultOptions, ...userOptions };
  let heading = options.heading;
  let body = options.body;
  let duration = options.duration;
  let clickToClose = options.clickToClose;
  return { heading, body, duration, clickToClose };
}
