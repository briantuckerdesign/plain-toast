# plain-toast 🍞

> Lightweight, accessible toast notifications with zero dependencies

[![npm version](https://img.shields.io/npm/v/plain-toast.svg)](https://www.npmjs.com/package/plain-toast)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/plain-toast)](https://bundlephobia.com/package/plain-toast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://plain-toast.bybrian.io/) | [GitHub](https://github.com/briantuckerdesign/plain-toast)

## Features

- **Lightweight** - ~5KB gzipped, zero dependencies
- **Accessible** - WCAG AA compliant with full ARIA support
- **Customizable** - Light, dark, and auto themes with CSS variables
- **Multiple Formats** - ESM, CJS, and IIFE builds
- **Progress Tracking** - Built-in progress toast with percentage display
- **Keyboard Friendly** - Full keyboard navigation support
- **TypeScript** - Full type definitions included
- **Motion Friendly** - Respects `prefers-reduced-motion`

## Installation

```bash
# npm
npm install plain-toast

# yarn
yarn add plain-toast

# pnpm
pnpm add plain-toast

# bun
bun add plain-toast
```

### CDN

```html
<!-- ES Module -->
<script type="module">
  import { Toast } from 'https://cdn.jsdelivr.net/npm/plain-toast/dist/plain-toast.esm.js';
</script>

<!-- IIFE (adds plain-toast to window) -->
<script src="https://cdn.jsdelivr.net/npm/plain-toast/dist/plain-toast.iife.js"></script>
```

## Quick Start

```javascript
import { Toast } from 'plain-toast';

// Create a success notification
new Toast({
  type: 'success',
  heading: 'Saved!',
  body: 'Your changes have been saved successfully.'
});
```

## Configuration

Configure global settings that apply to all toasts:

```javascript
import { configure } from 'plain-toast';

configure({
  position: 'top-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  theme: 'auto', // 'light' | 'dark' | 'auto' | 'none'
  injectCss: true, // Automatically inject styles
  announceToScreenReader: true, // Announce to screen readers
  ariaLive: 'polite' // 'polite' | 'assertive'
});
```

### Configuration Options

| Option                   | Type                    | Default          | Description                                  |
| ------------------------ | ----------------------- | ---------------- | -------------------------------------------- |
| `position`               | `Position`              | `'bottom-right'` | Screen corner for toast container            |
| `theme`                  | `Theme`                 | `'auto'`         | Color theme (auto follows system preference) |
| `injectCss`              | `boolean`               | `true`           | Automatically inject CSS styles              |
| `target`                 | `HTMLElement \| string` | `undefined`      | Custom container element or selector         |
| `icons`                  | `Partial<JTIcons>`      | `{}`             | Custom icon SVGs for each type               |
| `announceToScreenReader` | `boolean`               | `true`           | Announce toasts to screen readers            |
| `ariaLive`               | `AriaLive`              | `'polite'`       | ARIA live region priority                    |

## Toast Types

### Success

```javascript
new Toast({
  type: 'success',
  heading: 'Success!',
  body: 'Operation completed successfully.'
});
```

### Error

```javascript
new Toast({
  type: 'error',
  heading: 'Error',
  body: 'Something went wrong. Please try again.'
});
```

### Warning

```javascript
new Toast({
  type: 'warning',
  heading: 'Warning',
  body: 'This action cannot be undone.'
});
```

### Info

```javascript
new Toast({
  type: 'info',
  heading: 'New Update Available',
  body: 'Version 2.0 is now available for download.'
});
```

### Debug

```javascript
new Toast({
  type: 'debug',
  heading: 'Debug Info',
  body: 'API response: 200 OK'
});
```

### Spinner

```javascript
const loadingToast = new Toast({
  type: 'spinner',
  heading: 'Loading...',
  body: 'Please wait while we fetch your data.'
});

// Close when done
loadingToast.close();
```

## Progress

Track progress of long-running operations:

```javascript
const uploadToast = new Toast({
  type: 'progress',
  heading: 'Uploading file...',
  progress: {
    total: 100,
    current: 0,
    showPercentage: true
  }
});

// Update progress
uploadToast.setProgress(50); // 50%

// Increment progress
uploadToast.incrementProgress(10); // +10%

// Complete (sets to 100% and auto-closes after 2s)
uploadToast.complete();

// Or complete without auto-closing
uploadToast.complete(0);
```

### Progress Events

Listen for progress updates:

```javascript
const toast = new Toast({
  type: 'progress',
  heading: 'Processing...',
  progress: { total: 100 }
});

document.querySelector('[data-pt-toast]').addEventListener('jt:progress', (event) => {
  console.log(`Progress: ${event.detail.percentage}%`);
});
```

## Toast Options

```typescript
interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info' | 'debug' | 'spinner' | 'progress';
  heading: string;
  body?: string;
  duration?: number | null; // Auto-close after ms (null = don't auto-close)
  clickToClose?: boolean; // Click/keyboard to close
  progress?: {
    total: number;
    current?: number;
    showPercentage?: boolean;
  };
}
```

## API Reference

### Toast Class

#### Constructor

```javascript
const toast = new Toast(options);
```

#### Methods

##### `update(options)`

Update toast content after creation:

```javascript
toast.update({
  heading: 'Updated!',
  body: 'New content here'
});
```

##### `setProgress(current)`

Set progress to specific value (0-100):

```javascript
toast.setProgress(75);
```

##### `incrementProgress(amount)`

Increment progress by amount:

```javascript
toast.incrementProgress(5); // +5%
```

##### `complete(autoCloseDelay?)`

Complete progress and optionally auto-close:

```javascript
toast.complete(); // Auto-close after 2s
toast.complete(0); // Don't auto-close
toast.complete(5000); // Auto-close after 5s
```

##### `close()`

Manually close the toast:

```javascript
toast.close();
```

## Styling & Theming

### Built-in Themes

plain-toast includes three themes:

- **light** - Light background with dark text
- **dark** - Dark background with light text
- **auto** - Automatically matches system preference
- **none** - No CSS injection (bring your own styles)

```javascript
configure({ theme: 'dark' });
```

### CSS Variables

Customize colors using CSS variables:

```css
:root {
  /* Base colors */
  --pt-background: #ffffff;
  --pt-text: #475569;
  --pt-heading: #1e293b;
  --pt-border: #e2e8f0;

  /* Toast type colors */
  --pt-success-icon: #16a34a;
  --pt-success-border: #16a34a;

  --pt-error-icon: #ef4444;
  --pt-error-border: #ef4444;

  --pt-warning-icon: #d97706;
  --pt-warning-border: #facc15;

  /* ... more variables */
}
```

### Custom Styles

Opt out of CSS injection and provide your own:

```javascript
configure({
  theme: 'none',
  injectCss: false
});
```

Style elements with data attributes:

```css
[data-pt-container] {
  /* Container */
}
[data-pt-toast] {
  /* Toast */
}
[data-pt-toast][data-pt-success] {
  /* Success toast, replace success with error, info, etc. */
}
[data-pt-heading] {
  /* Heading */
}
[data-pt-body] {
  /* Body */
}
[data-pt-progress-bar] {
  /* Progress bar */
}
```

## Accessibility

### ARIA Support

- `role="status"` on each toast
- `aria-atomic="true"` for complete announcements
- `aria-live` region with configurable priority

### Keyboard Navigation

Enable click-to-close for keyboard accessibility:

```javascript
new Toast({
  type: 'info',
  heading: 'Press Enter to close',
  clickToClose: true // Now focusable and keyboard-accessible
});
```

- **Tab** - Focus the toast
- **Enter** or **Space** - Close the toast

### Screen Reader Announcements

Toasts are automatically announced to screen readers. Use the utility for custom announcements:

```javascript
import { announceToScreenReader } from 'plain-toast/utils/announce';

announceToScreenReader('File uploaded successfully', 'polite');
```

### Reduced Motion

Animations are automatically disabled for users who prefer reduced motion (`prefers-reduced-motion: reduce`).

## Custom Container

Render toasts in a custom container:

```javascript
// Using element
const container = document.getElementById('my-container');
configure({ target: container });

// Using selector
configure({ target: '#my-container' });
```

## TypeScript

Full TypeScript support with exported types:

```typescript
import {
  Toast,
  configure,
  type ToastOptions,
  type JTConfig,
  type Position,
  type Theme
} from 'plain-toast';

const options: ToastOptions = {
  type: 'success',
  heading: 'Success!',
  body: 'All done!'
};

new Toast(options);
```

## Examples

### Form Submission

```javascript
async function handleSubmit(data) {
  const toast = new Toast({
    type: 'spinner',
    heading: 'Submitting...'
  });

  try {
    await api.submit(data);

    toast.update({
      heading: 'Submitted!',
      body: 'Form submitted successfully.'
    });

    setTimeout(() => toast.close(), 3000);
  } catch (error) {
    toast.close();

    new Toast({
      type: 'error',
      heading: 'Error',
      body: error.message
    });
  }
}
```

### File Upload with Progress

```javascript
async function uploadFile(file) {
  const toast = new Toast({
    type: 'progress',
    heading: `Uploading ${file.name}`,
    progress: { total: 100, showPercentage: true }
  });

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const percentage = (e.loaded / e.total) * 100;
      toast.setProgress(percentage);
    }
  });

  xhr.upload.addEventListener('load', () => {
    toast.complete();
  });

  // ... send file
}
```

### Multiple Toasts

```javascript
function showToasts() {
  new Toast({
    type: 'info',
    heading: 'Step 1',
    body: 'Processing started'
  });

  setTimeout(() => {
    new Toast({
      type: 'info',
      heading: 'Step 2',
      body: 'Halfway there'
    });
  }, 1000);

  setTimeout(() => {
    new Toast({
      type: 'success',
      heading: 'Complete!',
      body: 'All steps finished'
    });
  }, 2000);
}
```

## License

MIT © [Brian Tucker](https://github.com/briantuckerdesign)

---

Made with ❤️ by [Brian Tucker](https://github.com/briantuckerdesign)
