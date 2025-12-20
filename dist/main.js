const debugIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2102_1592)"><path d="M12 7.5C12 5.84315 10.6569 4.5 9 4.5C7.34315 4.5 6 5.84315 6 7.5V12C6 13.6569 7.34315 15 9 15C10.6569 15 12 13.6569 12 12V7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.25 5.25L12 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.75 5.25L6 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.25 14.25L12 12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.75 14.25L6 12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 9.75H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9.75H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 3L8.25 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 3L9.75 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2102_1592"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>`;
const errorIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2102_1582)"><g clip-path="url(#clip1_2102_1582)"><path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.25 6.75L6.75 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.75 6.75L11.25 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></g><defs><clipPath id="clip0_2102_1582"><rect width="18" height="18" fill="white"/></clipPath><clipPath id="clip1_2102_1582"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>`;
const spinnerIcon = `<div></div>`;
const successIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2102_1564)"><g clip-path="url(#clip1_2102_1564)"><path d="M16.5 8.30999V8.99999C16.4991 10.6173 15.9754 12.191 15.007 13.4864C14.0386 14.7817 12.6775 15.7293 11.1265 16.1879C9.57557 16.6465 7.91794 16.5914 6.40085 16.0309C4.88376 15.4704 3.58849 14.4346 2.70822 13.0778C1.82795 11.721 1.40984 10.116 1.51626 8.50223C1.62267 6.88841 2.24791 5.35223 3.29871 4.12279C4.34951 2.89335 5.76959 2.03653 7.34714 1.6801C8.92469 1.32367 10.5752 1.48674 12.0525 2.14499" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 3L9 10.5075L6.75 8.2575" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></g><defs><clipPath id="clip0_2102_1564"><rect width="18" height="18" fill="white"/></clipPath><clipPath id="clip1_2102_1564"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>`;
function getIcon(type) {
  let iconHTML;
  switch (type) {
    case "success":
      iconHTML = config.icons.success;
      break;
    case "debug":
      iconHTML = config.icons.debug;
      break;
    case "error":
      iconHTML = config.icons.error;
      break;
    case "warning":
      iconHTML = config.icons.warning;
      break;
    case "spinner":
      iconHTML = config.icons.spinner;
      break;
    case "info":
      iconHTML = config.icons.info;
      break;
  }
  return iconHTML;
}
const warningIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2102_1587)"><path d="M16.2976 13.5L10.2976 3C10.1667 2.76915 9.97702 2.57714 9.74776 2.44355C9.5185 2.30996 9.25791 2.23958 8.99257 2.23958C8.72723 2.23958 8.46664 2.30996 8.23738 2.44355C8.00812 2.57714 7.8184 2.76915 7.68757 3L1.68757 13.5C1.55533 13.729 1.48599 13.9889 1.48658 14.2534C1.48716 14.5178 1.55765 14.7774 1.6909 15.0059C1.82416 15.2343 2.01543 15.4234 2.24534 15.5541C2.47525 15.6848 2.73562 15.7524 3.00007 15.75H15.0001C15.2632 15.7497 15.5217 15.6802 15.7495 15.5485C15.9773 15.4167 16.1665 15.2273 16.298 14.9993C16.4294 14.7714 16.4986 14.5128 16.4985 14.2496C16.4985 13.9864 16.4292 13.7279 16.2976 13.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6.75V9.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12.75H9.0075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2102_1587"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>`;
const infoIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2102_1792)"><path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6H9.0075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2102_1792"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>`;
let icons$1 = {
  get: getIcon,
  svg: {
    success: successIcon,
    warning: warningIcon,
    error: errorIcon,
    debug: debugIcon,
    spinner: spinnerIcon,
    info: infoIcon
  }
};
const darkStyles = `
:root {
  --vt--background: var(--vt-slate-800);
  --vt--text: var(--vt-slate-300);
  --vt--heading: var(--vt-slate-50);
  --vt--border: var(--vt-slate-700);
  --vt-progress-bar: var(--vt-slate-500);

  --vt-success-icon: var(--vt-green-500);
  --vt-success-border: var(--vt-green-600);

  --vt-error-icon: var(--vt-red-500);
  --vt-error-border: var(--vt-red-500);

  --vt-warning-icon: var(--vt-yellow-500);
  --vt-warning-border: var(--vt-yellow-400);

  --vt-info-icon: var(--vt-slate-400);
  --vt-info-border: var(--vt-slate-700);

  --vt-debug-icon: var(--vt-blue-300);
  --vt-debug-border: var(--vt-blue-600);

  --vt-spinner-icon: var(--vt-slate-400);
  --vt-spinner-border: var(--vt-slate-400);
}`;
const lightStyles = `
:root {
  --vt--background: var(--vt-white);
  --vt--text: var(--vt-slate-600);
  --vt--heading: var(--vt-slate-800);
  --vt--border: var(--vt-slate-200);
  --vt-progress-bar: var(--vt-slate-300);

  --vt-success-icon: var(--vt-green-600);
  --vt-success-border: var(--vt-green-600);

  --vt-error-icon: var(--vt-red-500);
  --vt-error-border: var(--vt-red-500);

  --vt-warning-icon: var(--vt-yellow-500);
  --vt-warning-border: var(--vt-yellow-400);

  --vt-info-icon: var(--vt-slate-500);
  --vt-info-border: var(--vt-slate-200);

  --vt-debug-icon: var(--vt-blue-600);
  --vt-debug-border: var(--vt-blue-600);

  --vt-spinner-icon: var(--vt-slate-500);
  --vt-spinner-border: var(--vt-slate-400);
}
`;
const autoStyles = `
${lightStyles}
@media (prefers-color-scheme: dark) {
    ${darkStyles}
}
`;
const swatches = `
:root {
    --vt-white: #ffffff;
    --vt-slate-50: #f8fafc;
    --vt-slate-200: #e2e8f0;
    --vt-slate-300: #cbd5e1;
    --vt-slate-400: #94a3b8;
    --vt-slate-500: #64748b;
    --vt-slate-600: #475569;
    --vt-slate-700: #334155;
    --vt-slate-800: #1e293b;
    --vt-black: #000000;

    --vt-green-500: #22c55e;
    --vt-green-600: #16a34a;
    --vt-red-500: #ef4444;
    --vt-yellow-400: #facc15;
    --vt-yellow-500: #eab308;
    --vt-blue-300: #93c5fd;
    --vt-blue-600: #2563eb;
  }
`;
const animations = `
@keyframes vt-progress-bar {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
@keyframes vt-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
const icons = `
.vt-icon {
    display: flex;
    width: 1rem;
    height: 1rem;
    justify-content: center;
    align-items: center;
  }
  .vt-icon.is-success {
    color: var(--vt-success-icon);
  }
  .vt-icon.is-warning {
    color: var(--vt-warning-icon);
  }
  .vt-icon.is-info {
    color: var(--vt-info-icon);
  }
  .vt-icon.is-error {
    color: var(--vt-error-icon);
  }
  .vt-icon.is-debug {
    color: var(--vt-debug-icon);
  }
  .vt-icon.is-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--vt-spinner-icon);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: vt-spinner 1s linear infinite;
  }
`;
const notificationTypes = `
.vt-toast.is-info {
    border-top-color: var(--vt-info-border);
  }

  .vt-toast.is-success {
    border-top-color: var(--vt-success-border);
  }

  .vt-toast.is-error {
    border-top-color: var(--vt-error-border);
  }

  .vt-toast.is-warning {
    border-top-color: var(--vt-warning-border);
  }

  .vt-toast.is-debug {
    border-top-color: var(--vt-debug-border);
  }

  .vt-toast.is-spinner {
    border-top-color: var(--vt-spinner-border);
  }
`;
const notificationBase = `
.vt-toast {
    position: relative;
    z-index: 99999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    width: 16rem;
    min-height: 1rem;
    padding: 1.25rem 1.5rem 1.5rem 1.5rem;
    pointer-events: auto;
    transition-property: opacity;
    transition-duration: 200ms;
    transition-timing-function: ease;
    box-shadow: 0rem 0.25rem 0.75rem 0rem hsla(0, 0%, 0%, 0.09);
    border-radius: 0.375rem;
    font-size: 1rem;
    background-color: var(--vt--background);
    border-color: var(--vt--border);
    border-style: solid;
    border-width: 1px;
    border-top-width: 0.5rem;
  }

  .vt-heading-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }

  .vt-heading {
    font-weight: 500;
    color: var(--vt--heading);
  }

  .vt-body {
    font-weight: 400;
    color: var(--vt--text);
  }

  .vt-progress-bar {
    width: 0%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.2rem;
    background-color: var(--vt-progress-bar);
  }
`;
const baseStyles = `
${swatches}
${notificationBase}
${notificationTypes}
${animations}
${icons}

[data-vt-container] {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  pointer-events: none;
}`;
const styles = {
  base: baseStyles,
  light: lightStyles,
  dark: darkStyles,
  auto: autoStyles
};
function deepMerge(target, source) {
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === "object" && !(source[key] instanceof Array)) {
      if (!target[key]) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });
}
function injectCss(...cssStrings) {
  const style = document.createElement("style");
  style.innerHTML = cssStrings.join("");
  document.head.appendChild(style);
}
const config = {
  containerSelector: "[data-vt-container]",
  injectCss: true,
  classes: {
    notificationClass: "vt-toast",
    headingWrapperClass: "vt-heading-wrapper",
    iconClass: "vt-icon",
    headingClass: "vt-heading",
    bodyClass: "vt-body",
    progressBarClass: "vt-progress-bar"
  },
  icons: {
    success: icons$1.svg.success,
    warning: icons$1.svg.warning,
    error: icons$1.svg.error,
    debug: icons$1.svg.debug,
    spinner: icons$1.svg.spinner,
    info: icons$1.svg.info
  },
  theme: "light"
};
function configure(options) {
  deepMerge(config, options);
  if (!config.injectCss) return;
  switch (config.theme) {
    case "none":
      break;
    case "light":
      injectCss(styles.light, styles.base);
      break;
    case "dark":
      injectCss(styles.dark, styles.base);
      break;
    case "auto":
      injectCss(styles.auto, styles.base);
      break;
  }
}
function closeNotification(notification, duration) {
  let closeTimeout;
  if (duration > 0) {
    const progressElement = notification.querySelector(
      "[data-vt-progress-bar]"
    );
    if (progressElement) {
      progressElement.style.animationName = "vt-progress-bar";
      progressElement.style.animationDuration = `${duration}ms`;
      progressElement.style.animationTimingFunction = "linear";
      progressElement.style.animationFillMode = "forwards";
    }
    notification.addEventListener("mouseover", () => {
      if (progressElement) {
        progressElement.style.animationPlayState = "paused";
      }
      clearTimeout(closeTimeout);
    });
    notification.addEventListener("mouseout", () => {
      if (progressElement) {
        progressElement.style.animationPlayState = "running";
      }
      closeTimeout = setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 250);
      }, duration);
    });
  }
  closeTimeout = setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 250);
  }, duration);
}
function enableClickToClose(notification) {
  notification.style.cursor = "pointer";
  notification.addEventListener(
    "click",
    () => closeNotification(notification, 0)
  );
}
function populateNotification(container, type, heading, body, notificationId) {
  const {
    notificationClass,
    headingWrapperClass,
    iconClass,
    bodyClass,
    headingClass,
    progressBarClass
  } = config.classes;
  const notificationToInject = `
<div data-vt-toast="${notificationId}" class="${notificationClass} is-${type}" >
  <div data-vt-heading-wrapper class="${headingWrapperClass}">
    <div data-vt-icon class="${iconClass} is-${type}"">${icons$1.get(type)}</div>
    <div data-vt-heading="true" class="${headingClass}">${heading}</div>
  </div>
  <div data-vt-body class="${bodyClass}">${body}</div>
  <div data-vt-progress-bar class="${progressBarClass}"></div>
</div>`;
  container.insertAdjacentHTML("beforeend", notificationToInject);
  const notification = container.querySelector(`[data-vt-toast="${notificationId}"]`);
  const bodyElement = notification.querySelector("[data-vt-body]");
  if (!body) bodyElement.style.display = "none";
  return notification;
}
const defaultOptions = {
  heading: "",
  // Required
  body: "",
  duration: 3500,
  // in ms, null for infinite
  clickToClose: true
};
function getOptions(userOptions) {
  let options = { ...defaultOptions, ...userOptions };
  let heading = options.heading;
  let body = options.body;
  let duration = options.duration;
  let clickToClose = options.clickToClose;
  return { heading, body, duration, clickToClose };
}
function createNotification(type, userOptions) {
  let { heading, body, duration, clickToClose } = getOptions(userOptions);
  if (type === "spinner") {
    duration = null;
    clickToClose = false;
  }
  const container = document.querySelector(config.containerSelector);
  const notificationId = Math.random().toString(36).substring(2, 11);
  const notification = populateNotification(
    container,
    type,
    heading,
    body,
    notificationId
  );
  container.appendChild(notification);
  if (duration) {
    closeNotification(notification, duration);
  }
  if (clickToClose) enableClickToClose(notification);
  return notification;
}
const notify = {
  success: (options) => createNotification("success", options),
  error: (options) => createNotification("error", options),
  warning: (options) => createNotification("warning", options),
  debug: (options) => createNotification("debug", options),
  info: (options) => createNotification("info", options),
  spinner: (options) => createNotification("spinner", options)
};
function updateNotification(notification, userOptions) {
  let { heading, body } = getOptions(userOptions);
  const headingElement = notification.querySelector(
    "[data-vt-heading]"
  );
  if (headingElement && heading) headingElement.innerHTML = heading;
  const bodyElement = notification.querySelector("[data-vt-body]");
  if (bodyElement && body) {
    bodyElement.innerHTML = body;
    bodyElement.style.display = "block";
  } else {
    bodyElement.innerHTML = "";
    bodyElement.style.display = "none";
  }
}
class Notification {
  constructor({
    type,
    heading,
    body = "",
    duration = defaultOptions.duration,
    clickToClose = defaultOptions.clickToClose
  }) {
    this.element = null;
    this.type = type;
    this.heading = heading;
    this.body = body;
    this.duration = duration;
    this.clickToClose = clickToClose;
    this.element = notify[this.type]({
      heading: this.heading,
      body: this.body,
      duration: this.duration,
      clickToClose: this.clickToClose
    });
  }
  update(options) {
    if (!this.element) return;
    updateNotification(this.element, options);
  }
  close() {
    if (!this.element) return;
    this.element.remove();
    this.element = null;
  }
}
window.notifyUtil = {
  Notification,
  configure,
  config
};
