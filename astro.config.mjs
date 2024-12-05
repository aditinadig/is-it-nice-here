import 'dotenv/config';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // Ensure this is set to 'server'
  adapter: node({
    mode: 'standalone', // Enables server routes
  }),
});