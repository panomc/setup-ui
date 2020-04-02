import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import autoPreprocess from "svelte-preprocess";
import copyTo from 'rollup-plugin-copy-assets-to';
import replace from '@rollup/plugin-replace';
import {terser} from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

const preprocess = autoPreprocess({
  scss: {},
  postcss: {
    plugins: [require('autoprefixer')],
  },
});

const plugins = [
  copyTo({
    assets: [
      './src/commons/favicon',
      './src/commons/fonts',
      './src/commons/img',
    ],
    outputDir: 'public/commons'
  }),

  copyTo({
    assets: [
      './src/assets',
    ],
    outputDir: 'public'
  }),

  svelte({
    // enable run-time checks when not in production
    dev: !production,
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css: css => {
      css.write("public/assets/css/bundle.css");
    },
    preprocess
  }),
  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ["svelte"]
  }),
  commonjs({
    namedExports: {
      'node_modules/jquery/dist/jquery.min.js': ['jquery'],
      'node_modules/bootstrap/dist/js/bootstrap.min.js': ['bootstrap']
    }
  }),

  replace({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
  }),

  // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && livereload("public"),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && terser()
];

const esExport = {
  input: "src/main.js",
  output: [
    {
      sourcemap: true,
      format: "es",
      name: "app",
      dir: "public/assets/js/es/"
    }
  ],
  plugins: plugins,
  watch: {
    clearScreen: false
  }
};

const systemExport = {
  input: "src/main.js",
  output: [
    {
      sourcemap: true,
      format: "system",
      name: "app",
      dir: "public/assets/js/system/"
    }
  ],
  plugins: plugins,
  watch: {
    clearScreen: false
  }
};

export default [
  esExport,
  systemExport
];
