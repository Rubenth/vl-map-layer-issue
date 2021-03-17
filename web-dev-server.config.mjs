import proxy from 'koa-proxies';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import {fromRollup} from '@web/dev-server-rollup';

const node = 'node_modules';

export default {
  port: 8000,
  watch: true,
  // Om call naar deze super toffe toepassing te laten lukken.
  // Voeg "127.0.0.1 local.omgeving.vlaanderen.be" toe aan /etc/hosts
  // indien het nog niet werkt, neem contact op met Sander
  hostname: 'local.omgeving.vlaanderen.be',
  nodeResolve: true,
  appIndex: 'index.html',
  open: true,
  middleware: [
    proxy('/api**', {
      target: 'http://localhost:8080',
    }),
    proxy('/admin/**', {
      target: 'http://localhost:8080',
    }),
    proxy('/login', {
      target: 'http://localhost:8080',
    }),
  ],
  plugins: [
    fromRollup(resolve)(),
    fromRollup(commonjs)({
      include: `${node}/**`,
      exclude: [`${node}/proj4/**`, `${node}/tinymce/**`],
    })
  ]
};
