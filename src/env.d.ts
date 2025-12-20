/**
 * Type declarations for CSS imports with ?inline suffix
 * These CSS files are loaded as strings by the Bun bundler
 */

declare module '*.css?inline' {
  const content: string;
  export default content;
}
