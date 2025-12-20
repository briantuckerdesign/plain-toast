/**
 * Build script using Bun's native bundler
 * Generates multiple output formats: ESM, CJS, IIFE
 */

const entrypoint = './src/main.ts';
const outdir = './dist';

// Plugin to handle CSS imports with ?inline suffix
const cssPlugin = {
  name: 'css-inline-loader',
  setup(build: any) {
    // Resolve .css?inline imports
    build.onResolve({ filter: /\.css\?inline$/ }, (args: any) => {
      const path = require('path');
      const resolvedPath = path.resolve(
        args.resolveDir,
        args.path.replace('?inline', '')
      );
      return { path: resolvedPath, namespace: 'css-inline' };
    });

    // Load the CSS file as a string
    build.onLoad({ filter: /.*/, namespace: 'css-inline' }, async (args: any) => {
      const file = Bun.file(args.path);
      const contents = await file.text();
      return {
        contents: `export default ${JSON.stringify(contents)}`,
        loader: 'js'
      };
    });
  }
};

async function build() {
  console.log('🔨 Building just-toast...\n');

  try {
    // Build ESM format
    console.log('Building ESM format...');
    await Bun.build({
      entrypoints: [entrypoint],
      outdir,
      target: 'browser',
      format: 'esm',
      naming: 'just-toast.esm.js',
      minify: true,
      sourcemap: 'external',
      plugins: [cssPlugin]
    });

    // Build CJS format
    console.log('Building CJS format...');
    await Bun.build({
      entrypoints: [entrypoint],
      outdir,
      target: 'node',
      format: 'cjs',
      naming: 'just-toast.cjs.js',
      minify: true,
      sourcemap: 'external',
      plugins: [cssPlugin]
    });

    // Build IIFE format (for browsers via script tag)
    console.log('Building IIFE format...');
    await Bun.build({
      entrypoints: ['./src/main.iife.ts'],
      outdir,
      target: 'browser',
      format: 'iife',
      naming: 'just-toast.iife.js',
      minify: true,
      sourcemap: 'external',
      plugins: [cssPlugin]
    });

    console.log('\n✅ Build complete!');
    console.log('\nGenerated files:');
    console.log('  • dist/just-toast.esm.js (ESM format)');
    console.log('  • dist/just-toast.cjs.js (CommonJS format)');
    console.log('  • dist/just-toast.iife.js (IIFE format for browsers)');
    console.log('\n📝 Generating TypeScript declarations...');

    // Generate TypeScript declarations using tsconfig settings
    const tsc = Bun.spawn(['bunx', 'tsc', '--emitDeclarationOnly'], {
      stdout: 'inherit',
      stderr: 'inherit'
    });

    await tsc.exited;

    if (tsc.exitCode === 0) {
      console.log('✅ TypeScript declarations generated!');
    } else {
      console.error('❌ Failed to generate TypeScript declarations');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
