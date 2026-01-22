// src/pages/api/keystatic/[...params].ts

// 1. IMPORTANT: This line tells Astro "Run this on the server, not at build time"
export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const ALL = makeHandler({
  config,
});
