import 'dotenv/config';

import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({
    mode: 'standalone', // You can also use 'middleware' if needed.
  }),
});