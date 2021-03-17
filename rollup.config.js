import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from '@open-wc/rollup-plugin-html';
import {eslint} from "rollup-plugin-eslint";

const node = 'node_modules'
const output = `build/release`;

const copyTargets = [
  {src: 'images/**', dest: `${output}/images`},
  {src: "i18n/*.json", dest: `${output}/i18n`},
  {src: "robots.txt", dest: `${output}`},

  // include all webcomponents
  {src: `${node}/vl-ui-*/dist/*.css`, dest: `${output}/${node}`},
  {src: `${node}/vl-ui-*/dist/*.js`, dest: `${output}/${node}`},
  {src: `${node}/vl-ui-*/lib/*.js`, dest: `${output}/${node}`},
  {src: `${node}/@govflanders/vl-ui-*/dist/js/*.js`, dest: `${output}/${node}`},
  {src: `${node}/@webcomponents/**/*`, dest: `${output}/${node}`},
  {src: `${node}/document-register-element/**/*`, dest: `${output}/${node}`},
  {src: `${node}/tinymce/**/*`, dest: `${output}/${node}`},
  {src: `${node}/proj4/dist/proj4.js`, dest: `${output}/${node}`},
  {src: `${node}/vl-mapactions/lib/**/*`, dest: `${output}/${node}`},
  {src: `${node}/vl-mapactions/dist/**/*`, dest: `${output}/${node}`}
];

export default {
  input: './index.html',
  output: {
    dir: `${output}`,
    entryFileNames: '[name].[hash].js',
    chunkFileNames: '[name].[hash].js',
    format: 'es'
  },
  plugins: [
    eslint(),
    html({}),
    copy({
      targets: copyTargets,
      flatten: false
    }),
    resolve(),
    commonjs({
      include: `${node}/**`
    })
  ]
};
