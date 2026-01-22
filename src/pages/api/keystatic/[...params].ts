export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const ALL = makeHandler({
  config,
  // PASTE YOUR ACTUAL GITHUB ID AND SECRET HERE DIRECTLY
  // (We will delete this file immediately after it works)
  clientId: 'Ov23liBQIsGASwxNl3kg', // <-- Paste your actual Client ID inside the quotes
  clientSecret: '5246565b6a4053693c078332587313feb38f0978', // <-- Paste your actual Client Secret inside the quotes
  secret: process.env.KEYSTATIC_SECRET, // Keep this one as a variable
});
