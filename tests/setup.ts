import { afterEach } from 'bun:test';
/**
 * Test setup file - runs before all tests
 * Configures happy-dom for DOM testing
 */

import { Window } from 'happy-dom';

// Create a new Window instance
const window = new Window();
const document = window.document;

// Set up globals for tests
global.window = window as any;
global.document = document as any;
global.HTMLElement = window.HTMLElement as any;
global.Element = window.Element as any;
global.Node = window.Node as any;
global.CustomEvent = window.CustomEvent as any;

// Clean up after each test
afterEach(() => {
  // Clear the document body
  document.body.innerHTML = '';

  // Remove any toast containers
  const containers = document.querySelectorAll('[data-jt-container]');
  containers.forEach((container) => container.remove());

  // Remove any screen reader live regions
  const liveRegions = document.querySelectorAll('[data-jt-sr-only]');
  liveRegions.forEach((region) => region.remove());
});
