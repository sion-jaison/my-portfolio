export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const ALL = makeHandler({
  config,
  // HARDCODED GITHUB KEYS (From your paste)
  clientId: 'Ov23liBQIsGASwxNl3kg', 
  clientSecret: '5246565b6a4053693c078332587313feb38f0978',
  
  // HARDCODED SESSION KEY (This was likely the missing piece!)
  secret: '1234567890abcdef1234567890abcdef', 
});
