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

export const baseStyles = `
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
