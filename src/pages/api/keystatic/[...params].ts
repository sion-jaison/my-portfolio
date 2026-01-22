export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const ALL = makeHandler({
  config,
  // Force-feed the credentials from the environment
  clientId: import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: import.meta.env.KEYSTATIC_SECRET,
});
